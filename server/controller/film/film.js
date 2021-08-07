// import FilmModel from "../../model/film/film";
import { film } from "../../api";
class Film {
  getHeader = async (req, res) => {
    let data = await film.get245BtHeader({}).catch((err) => {
      res.json(err);
    });
    if (!data) {
      return res.json([]);
    }
    return res.json(data || []);
  };
  getList = async (req, res) => {
    let path = req.query.path.replace(/[\\']/g, "");
    let data = await film.get245BtTabData(path).catch((err) => {
      res.json(err);
    });
    res.json(data);
  };
  getListItem = async (req, res) => {
    let path = req.query.path.replace(/[\\']/g, "");
    let search = req.query.search;
    let data = await film.get245BtListItem(path, search).catch((err) => {
      res.json(err);
    });
    res.json(data);
  };
  parsePlayerUrl = async (req, res) => {
    let path = req.query.path.replace(/[\\']/g, "");
    let search = req.query.search;
    let data = await film.get245BtPlayerUrl(path,search).catch((err) => {
      res.json(err);
    });
    res.json(data);
  };
  searchListBywords = (req, res) => {
    let keyWords = req.query.keyWords;
    let pageIndex = req.query.pageIndex;
    film
      .search245BtBykeywords("/search.php", {
        searchword: keyWords,
        page: pageIndex,
      })
      .then((data) => {
        res.json(data || []);
      })
      .catch((err) => {
        res.json(err);
      });
  };
}
export default new Film();
