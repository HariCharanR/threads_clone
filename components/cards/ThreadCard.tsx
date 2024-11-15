import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface Params {
    id:string;
    currentUserId:string | undefined ;
    content:string;
    parentId: string | null;
    author:{
        name : string ;
        image:string;
        id : string;
    }
    community : {
        id:string;
        name :string;
        image : string;
    } | null;
    createdAt : string;
    comments : {
        author : {
            image : string;
        }
    }[]
    isComment?: boolean;
}

function ThreadCard({id,currentUserId,parentId,content,author,community,comments,createdAt , isComment}: Params) {
  return (
    <article className={`flex w-full flex-col rounded-xl   ${isComment ? 'px-0 xs:px-7 mb-8':
    'bg-dark-2 p-7'}`}>

        <div className='flex items-start justify-between'>
            <div className="flex w-full flex-1 flex-row gap-4">
                <div className="flex flex-col items-center">
                    <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
                        <Image
                            src={author.image}
                            alt="Profile image"
                            fill 
                            className='cursor-pointer rounded-full'
                        />
                    </Link>

                    <div className="thread-card_bar"/>
                </div>
                <div className="flex w-full flex-col">
                <Link href={`/profile/${author.id}`} className=" h-11 w-fit">
                    <h4 className='cursor-pointer text-base-semibold text-light-1'>{author.name}</h4>
                </Link>
                <p className='mt-2 text-small-regular text-light-2'>{content}</p>

                <div className={`${isComment && 'mb-10'} mt-5 flex flex-col gap-3`}>
                    <div className="flex gap-3.5">
                        <Image src="/assets/heart-gray.svg" alt='heart' width={24} height={24} className='cursor-pointer object-contain' />
                        <Image src="/assets/repost.svg" alt='heart' width={24} height={24} className='cursor-pointer object-contain' />
                        <Link 
                        href={`/thread/${id}`}
                        >
                        <Image src="/assets/reply.svg" alt='heart' width={24} height={24} className='cursor-pointer object-contain' />
                        </Link>
                        <Image src="/assets/share.svg" alt='heart' width={24} height={24} className='cursor-pointer object-contain' />
                    </div>

                    {isComment && comments.length > 0 && (
                        <Link
                        href={`/thread/${id}`}
                        >
                            <p className='mt-1 text-subtle-medium text-gray-1'>
                                {comments.length}
                            </p>
                        </Link>
                    )}
                </div>
                </div>
            </div>
        </div>

    

    </article>
  )
}

export default ThreadCard