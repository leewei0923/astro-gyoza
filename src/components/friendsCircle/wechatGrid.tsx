import React, { useState } from 'react'

interface WeChatGridProps {
  images: string[]
}

const WeChatGrid = ({ images }: WeChatGridProps) => {
  const [previewSrc, setPreviewSrc] = useState<null | string>(null)

  const gridTemplate =
    images.length === 1 ? 'grid-cols-1' : images.length === 2 ? 'grid-cols-2' : 'grid-cols-3'

  return (
    <>
      {/* 九宫格图像 */}
      <div className={`max-w-[800px] mx-auto py-5 grid ${gridTemplate} gap-4`}>
        {images.map((src, index) => (
          <div
            key={index}
            className={`relative overflow-hidden h-64 rounded-md bg-gray-100`}
            onClick={() => setPreviewSrc(src)}
          >
            <img
              src={src}
              alt={`img-${index}`}
              className="w-full h-full object-cover cursor-pointer"
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default WeChatGrid
