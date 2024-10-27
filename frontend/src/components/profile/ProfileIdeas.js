'use client'

import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share, Eye } from "lucide-react"
import { getTimeString } from "@/lib/utils/otherUtils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"

export default function ProfileIdeas({ ideas = [] }) {
  const router = useRouter()

  if (ideas.length === 0) {
    return (
      <Card className="p-4 bg-light-bg-sec dark:bg-dark-bg-sec">
        <p className="text-center text-muted-foreground">No ideas posted yet</p>
      </Card>
    )
  }

  const handleShare = async (ideaId) => {
    await navigator.clipboard.writeText(`${window.location.origin}/idea/${ideaId}`)
    toast("Link copied to clipboard", {
      duration: 1000,
      type: "success",
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {ideas.map((idea) => (
        <Card 
          key={idea.id} 
          className="overflow-hidden cursor-pointer transition-shadow hover:shadow-lg bg-light-bg-sec dark:bg-dark-bg text-dark-bg dark:text-light-bg   "
        >   
          <CardContent className="p-0" onClick={() => router.push(`/idea/${idea.id}`)}>
            {idea.images && idea.images.length > 0 && (
              <div className="relative aspect-video">
                <Image
                  src={idea.images[0].url}
                  alt={idea.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{idea.title}</h2>
              <p className="text-sm text-muted-foreground line-clamp-3">{idea.description}</p>
            </div>
          </CardContent>
          <CardFooter className="p-4 flex justify-between items-center">
            <div className="flex space-x-1">
              <Button variant="ghost" size="sm" className="p-2">
                <Heart className="h-4 w-4 mr-1" />
                <span>{idea.upvotesCount}</span>
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <MessageCircle className="h-4 w-4 mr-1" />
                <span>{idea.commentsCount}</span>
              </Button>
            </div>
            <Button variant="ghost" size="sm" className="p-2" onClick={(e) => { e.stopPropagation(); handleShare(idea.id); }}>
              <Share className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}