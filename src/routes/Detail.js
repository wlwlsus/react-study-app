import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [detailImg, setImage] = useState("");
  const getMovies = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setImage(json.data.movie.large_cover_image);
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div>
      <h1>Detail</h1>
      <img alt="" src={detailImg}></img>
    </div>
  );
}

export default Detail;
