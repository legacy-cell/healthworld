import Image from 'next/image';
import type { Article } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      {article.imageUrl && (
        <div className="relative w-full h-48">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            style={{ objectFit: 'cover' }}
            data-ai-hint={`${article.category} article`}
          />
        </div>
      )}
      <CardHeader>
        <Badge variant="secondary" className="w-fit mb-2">{article.category}</Badge>
        <CardTitle className="text-xl">{article.title}</CardTitle>
        <CardDescription className="line-clamp-3">{article.summary}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {article.keywords && article.keywords.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {article.keywords.map(keyword => (
              <Badge key={keyword} variant="outline">{keyword}</Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        {article.link ? (
          <Button asChild variant="link" className="p-0 h-auto">
            <Link href={article.link} target="_blank" rel="noopener noreferrer">
              Read More <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        ) : article.content ? (
           <Button asChild variant="link" className="p-0 h-auto">
            {/* Placeholder for internal link or modal trigger */}
            <Link href={`/resources/article/${article.id}`}> 
              Read More <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
}
