export default function Page({params}:{
    params: {
        id: string;
    }
}) {
    return (
        <div>
            PostPage{params.id}
        </div>
    );
}