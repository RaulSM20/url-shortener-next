'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Check, CopyIcon, EyeIcon } from 'lucide-react'

type Url = {
    id: string,
    shortCode: string,
    originalUrl: string
    visits: number
}

export default function UrlList() {
    const [urls, setUrls] = useState<Url[]>([]);
    const [copied, setCopied] = useState<boolean>(false);
    const [copyUrl, setcopyUrl] = useState<string>('');


    const shortenerUrl = (code: string) => `shortrsm/${code}`;

    const fetchUrls = async () => {
        try {
            const res = await fetch('/api/urls')
            const data = await res.json();
            setUrls(data)
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchUrls()
    },[])

    const handleCopy = (code: string) => {
        const fullUrl = `${shortenerUrl(code)}`
        navigator.clipboard.writeText(fullUrl).then(() => {
            setCopied(true)
            setcopyUrl(code)
            setTimeout(() => {
                setCopied(false)
                setcopyUrl('')
            }, 10000)
        })
    }

  return (
    <div>
        <h2 className='text-2xl font-bold mb-2'>Recent URLs</h2>
        <ul className='space-y-2'>
            {urls.map((url) => (
                <li key={url.id} className='flex items-center gap-2 justify-between'>
                <Link
                    href={`/${url.shortCode}`}
                    className='text-blue-400'
                    target='_blank'
                >
                    {shortenerUrl(url.shortCode)}
                </Link>
                <div className='flex items-center gap-2'>
                    <Button variant='ghost' size='icon' className='text-muted-foreground hover:bg-muted' onClick={() => handleCopy(url.shortCode)}>
                        {
                            copied && copyUrl == url.shortCode ? (
                        <Check className='w-4 h-4'></Check>

                            ) : (
                        <CopyIcon className='w-4 h-4'></CopyIcon>

                            )
                        }
                        <span className='sr-only'>Copy Url</span>
                    </Button>
                    <span className='flex items-center'>
                        <EyeIcon className='h-4 w-4' ></EyeIcon>
                        {url.visits}
                    </span>
                </div>
            </li>
            ))}
        </ul>
    </div>
  )
}
