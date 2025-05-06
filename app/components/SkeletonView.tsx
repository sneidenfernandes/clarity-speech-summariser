import SkeletonCard from "./SkeletonCard"
export default function SkeletonView(){

  const list = [{id:1}, {id:2}, {id:3},{id:4}, {id:5}, {id:6}]
    

    return <div className="flex justify-center mt-20">
    <ul className="grid grid-cols-1 gap-y-6 justify-between gap-4 md:grid-cols-2 lg:grid-cols-3 inset-shadow-sm inset  px-auto lg:px-20 rounded-4xl">
        {
            list.map((note)=> <div key={note.id}>
                <SkeletonCard/>
            </div>)
        }
    </ul>
</div>  
}
