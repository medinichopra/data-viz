import BlogList from './BlogList';
import useFetch from './hooks/useFetch';

const Home = () => {
    // const [name, setName] = useState('mario');
    // const [age, setAge] = useState(25)
    // const handleDelete = (id) => {
    //     const newBlogs = blogs.filter(blog => blog.id !== id)
    //     setBlogs(newBlogs);
    // }
    const {data: blogs, isPending, error} = useFetch("http://localhost:8000/blogs")
    
    return (  
        <div className="home">
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {blogs && <BlogList blogs={blogs} title="All blogs"/>}
            {/* <button onClick={() => setName('luigi')}>change name</button> */}
            {/* <BlogList blogs={blogs.filter((blog) => blog.author === 'mario')} title="Marios blogs"/> */}

            {/* <p>{name} is {age} years old</p>
            <button onClick={handleClick}>Click Me</button> */}
        </div>
    );
}
 
export default Home;

// Here we are not invoking the function butm merely referencing it, the invoking happens on click
//const [] name is what we want to call the value of useState and setname is what we want to set it to