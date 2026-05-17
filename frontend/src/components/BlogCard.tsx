interface BlogCardProps {
    aurthorname: string;
    title: string;
    content: string;
    publishedDate: string;
}

export const BlogCard = ({ aurthorname, title, content, publishedDate }: BlogCardProps) => {
    return (
        <div>
            <div>{aurthorname} . {publishedDate}</div>
            <div>{title}</div>
            <div>{content.slice(0, 100) + "..."}</div>
            <div>{`${Math.ceil(content.length / 100)} minutes`}</div>
            <div className="bg-slate-200 h-1 w-full"></div>
        </div>
    );
};

function BlogPage() {
    return (
        <div>
            <BlogCard
                aurthorname={"ratnadeep"}
                title={"title of the blog"}
                content={"content of the blog"}
                publishedDate={"17th may 2026"}
            />
        </div>
    );
}

function Avatar(){
    return(
    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-neutral-tertiary rounded-full">
        <span className="font-medium text-body">JL</span>
    </div>

    )
}

export default BlogPage;