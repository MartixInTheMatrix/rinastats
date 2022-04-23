import './home.css'
import '../../App.css'

const Home = ({text}) => {
    return (
        <div className="home">
            <h1>Home</h1>
            <h3>{text}</h3>
        </div>

    );
}
  
export default Home;