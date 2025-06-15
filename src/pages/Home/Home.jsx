import style from './Home.module.css';

const Home = () => {
    return(
        <div className="front">
            <h2>THIS IS HOME</h2>
            <img src="" alt="" />
            <p className={style.hometext}>This is a font</p>
            <button className={style.buttonx}>Click me</button>
        </div>
    );
}

export default Home;