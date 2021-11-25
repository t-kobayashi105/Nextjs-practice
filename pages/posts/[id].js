import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../styles/utils.module.css'


export default function Post({ postData }) {
  return (
    <Layout>
      <Head>{/* <Head>タグで囲むことで、メタタグを指定することができページのタグが変更される */}
        <title>{postData.title}</title>
      </Head>
      <article>   {/* <article>タグで囲み、CSSをimportし適用させる */}
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />  {/* date-fnsを使用したDateコンポーネントをimportし、フォーマットを変更 */}
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}


export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}


export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)  //IDに基づいた投稿を取得する
  return {
    props: {
      postData
    }
  }
}