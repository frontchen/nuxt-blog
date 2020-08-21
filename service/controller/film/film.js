import FilmModel from "../../model/film/film";
import broswerApi from "../../utils/broswerApi";
class Film {
  getHeader = (req, res) => {
    console.log(["header", "start", res, req]);
    // if (err) res.json(err);
    // let data = await broswerApi.get245BtHeader({}).catch(err => {
    //   console.log(["err", err]);
    // });
    // console.log(["header", data]);
    res.json({ code: 0 });
  };
}
export default new Film();
