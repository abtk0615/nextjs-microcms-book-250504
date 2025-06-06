import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";
import Category from "../Category";
import Date from "../Date";
import { News } from "@/app/_libs/microcms";

type Props = {
  news: News[];
};

export default function NewsList({ news }: Props){
  if(news.length === 0){
    return <p>記事がありません。</p>;
  }
  return (
    <ul>
      {news.map(function(article){
        return (
          <li key={article.id} className={styles.list}>
            <Link href={`/news/${article.id}`} className={styles.link}>
              {article.thumbnail ? (
                <Image 
                  src={article.thumbnail.url}
                  alt=""
                  width={article.thumbnail.width}
                  height={article.thumbnail.height}
                  className={styles.image}
                />
              ) : (
                <Image 
                  src="/no-image.png"
                  alt="No Image"
                  width={1200}
                  height={630}
                  className={styles.image}
                />
              )}
              <dl>
                <dt className={styles.title}>{article.title}</dt>
                <dd className={styles.meta}>
                  <Category category={article.category} />
                  <Date date={article.publishedAt ?? article.createdAt} />
                </dd>
              </dl>
            </Link>
          </li>
        )
      })}
    </ul>
  );
}