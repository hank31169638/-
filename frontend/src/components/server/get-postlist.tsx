import Link from 'next/link'

async function fetchPosts() {
    const res = await fetch('/api/posts', {
        cache: "force-cache", /// < SSG
    })
    return res.json()
}

export default async function PostList() {
    const posts = await fetchPosts();
    return (
        <ul>
            {posts.map((post:any) => (
                <li key={post.id}>
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </li>
            ))}
        </ul>
    )
}