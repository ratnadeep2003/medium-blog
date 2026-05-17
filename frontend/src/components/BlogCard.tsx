interface BlogCardProps {
    aurthorname: string;
    title: string;
    content: string;
    publishedDate: string;
}

export const BlogCard = ({ aurthorname, title, content, publishedDate }: BlogCardProps) => {
    return (
        <div className="p-4 border-b border-slate-200 pb-4">
            <div className="flex">
                <div className="flex">
                    <Avatar name={aurthorname}/>
                    <div className="font-extralight flex justify-center  pl-2 text-sm">{aurthorname}</div>
                    <div>.</div>
                    <div className="pl-2 font-thin font-slate-500 text-sm">{publishedDate}</div>
                </div>
            </div>
                
                <div className="text-xl font-semibold">{title}</div>
                <div className="text-md font-thin">{content.slice(0, 100) + "..."}</div>
                <div className="text-slate-500 text-sm font-thin">{`${Math.ceil(content.length / 100)} minutes(s) read`}</div>
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

export function Avatar({name}:{name:string}){
    return(
    <div className="relative inline-flex items-center justify-center w-6 h-4 overflow-hidden bg-neutral-tertiary rounded-full">
        <span className="font-xs text-gray-600 dark:text-gray-300">{name[0]}</span>
    </div>

    )
}

export default BlogPage;