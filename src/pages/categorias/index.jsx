import PostSkeleton from "@components/basic/PostSkeleton";
import Link from "next/link";

export default function AllCategories({ categories }) {

    return (
        <div className="w-11/12 mx-auto">
            {categories === null
                ? <PostSkeleton />
                : (
                    <div>
                        {categories.map(category => (
                            <div key={category.id} >
                                <Link
                                className="flex justify-between items-center w-full my-4 shadow-md p-1 hover:outline"
                                style={{outlineColor:category.bg}}
                                    href={`/categorias/${category.slug}`}

                                >
                                    <div className="p-1 mr-2" style={{color:category.color,background:category.bg}}>
                                        <i className={`far fa-${category.icon} text-5xl`}></i>
                                    </div>
                                    <div>
                                        <header className="w-full uppercase font-bold">
                                            <h1>{category.name}</h1>
                                        </header>
                                        <div>
                                            <p>{category.excerpt}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    )
}
// export async function getServerSideProps(ctx) {
//     const data = await Categories.getAllCategories();
//     const categories = data.result.categories

//     return {
//         props: {
//             categories
//         }
//     }

// }
export async function getStaticProps(context) {
    const res = await fetch('http://localhost:3000/api/categories').then(res => res.json())
    const categories = res.categories ? res.categories : null;
  
    return {
      // Passed to the page component as props
      props: { categories: categories },
    }
  }