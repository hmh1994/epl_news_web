import { NewsArticle } from "../model/news-article";

interface NewsArticleContentProps {
  article: NewsArticle;
}

export const NewsArticleContent = ({ article }: NewsArticleContentProps) => {
  return (
    <article className='space-y-6 text-base leading-relaxed text-slate-200 sm:text-lg'>
      {article.content.map((paragraph, index) => (
        <p key={index} className='text-slate-200'>
          {paragraph}
        </p>
      ))}
    </article>
  );
};
