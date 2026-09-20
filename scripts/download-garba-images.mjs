import fs from 'fs'
import path from 'path'
import https from 'https'
import http from 'http'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '..', 'public', 'images', 'garba-fest')
fs.mkdirSync(outDir, { recursive: true })

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http
    const req = lib.get(
      url,
      {
        headers: {
          'User-Agent': 'EventBizDemo/1.0 (educational; local garba venue demo)',
          Accept: 'application/json',
        },
        timeout: 30000,
      },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          fetchJson(res.headers.location).then(resolve, reject)
          return
        }
        let data = ''
        res.on('data', (c) => (data += c))
        res.on('end', () => {
          try {
            resolve(JSON.parse(data))
          } catch (e) {
            reject(e)
          }
        })
      },
    )
    req.on('error', reject)
    req.on('timeout', () => {
      req.destroy()
      reject(new Error('timeout'))
    })
  })
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http
    const req = lib.get(
      url,
      {
        headers: { 'User-Agent': 'EventBizDemo/1.0 (educational; local garba venue demo)' },
        timeout: 45000,
      },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          download(res.headers.location, dest).then(resolve, reject)
          return
        }
        if (res.statusCode !== 200) {
          res.resume()
          reject(new Error('HTTP ' + res.statusCode))
          return
        }
        const file = fs.createWriteStream(dest)
        res.pipe(file)
        file.on('finish', () => file.close(() => resolve(dest)))
        file.on('error', reject)
      },
    )
    req.on('error', reject)
    req.on('timeout', () => {
      req.destroy()
      reject(new Error('timeout'))
    })
  })
}

const queries = [
  'Garba dance',
  'Navratri Garba',
  'Dandiya Raas',
  'Garba Gujarat',
  'Navratri festival India',
  'Raas Garba',
  'Garba night',
  'Dandiya sticks dance',
]

async function searchImages(q, limit = 20) {
  const url =
    'https://commons.wikimedia.org/w/api.php?' +
    new URLSearchParams({
      action: 'query',
      format: 'json',
      origin: '*',
      generator: 'search',
      gsrsearch: `filetype:bitmap ${q}`,
      gsrnamespace: '6',
      gsrlimit: String(limit),
      prop: 'imageinfo',
      iiprop: 'url|mime|size',
      iiurlwidth: '1280',
    })
  const json = await fetchJson(url)
  const pages = json?.query?.pages || {}
  const list = []
  for (const p of Object.values(pages)) {
    const info = p.imageinfo?.[0]
    if (!info) continue
    const mime = info.mime || ''
    if (!mime.startsWith('image/')) continue
    if (mime.includes('svg')) continue
    const src = info.thumburl || info.url
    if (!src) continue
    list.push({ title: p.title, url: src, mime })
  }
  return list
}

const seen = new Set()
const collected = []

for (const q of queries) {
  if (collected.length >= 50) break
  try {
    process.stdout.write(`search: ${q}… `)
    const hits = await searchImages(q, 25)
    let added = 0
    for (const h of hits) {
      if (collected.length >= 50) break
      const key = h.url.split('?')[0]
      if (seen.has(key)) continue
      seen.add(key)
      collected.push(h)
      added++
    }
    console.log(`+${added} (total ${collected.length})`)
  } catch (e) {
    console.log('fail', e.message)
  }
  await new Promise((r) => setTimeout(r, 400))
}

console.log('Downloading', collected.length, 'images…')
for (let i = 0; i < collected.length; i++) {
  const n = String(i + 1).padStart(2, '0')
  const ext = collected[i].mime.includes('png') ? 'png' : 'jpg'
  const dest = path.join(outDir, `garba-${n}.${ext}`)
  try {
    await download(collected[i].url, dest)
    const size = fs.statSync(dest).size
    if (size < 5000) {
      fs.unlinkSync(dest)
      console.log(`skip ${n} too small`)
      continue
    }
    console.log(`ok ${n} ${(size / 1024).toFixed(0)}KB`)
  } catch (e) {
    console.log(`fail ${n}`, e.message)
  }
  await new Promise((r) => setTimeout(r, 250))
}

const files = fs.readdirSync(outDir).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f)).sort()
console.log('DONE files=', files.length)
fs.writeFileSync(
  path.join(outDir, 'manifest.json'),
  JSON.stringify(
    {
      source: 'Wikimedia Commons',
      note: 'Free-licensed Garba/Navratri/Dandiya images (Google Images cannot be bulk-downloaded legally)',
      count: files.length,
      files,
    },
    null,
    2,
  ),
)
