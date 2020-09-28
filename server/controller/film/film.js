// import FilmModel from "../../model/film/film";
import api from "../../api/api";
class Film {
  getHeader = async (req, res) => {
    let data = await api.get245BtHeader({}).catch(err => {
      res.json(err);
    });
    res.json(data);
  };
  getList = async (req, res) => {
    let path = req.query.path.replace(/[\\']/g, "");
    let data = await api.get245BtTabData(path).catch(err => {
      res.json(err);
    });
    res.json(data);
  };
  getListItem = async (req, res) => {
    let path = req.query.path.replace(/[\\']/g, "");
    let data = await api.get245BtListItem(path).catch(err => {
      res.json(err);
    });
    res.json(data);
  };
  parsePlayerUrl = async (req, res) => {
    let path = req.query.path;
    let data = await api.get245BtPlayerUrl(path).catch(err => {
      res.json(err);
    });
    res.json(data);
  };
  searchListBywords = async (req, res) => {
    let searchword = req.query.searchword;
    let data = await api
      .search245BtBykeywords({
        searchword: searchword
      })
      .catch(err => {
        res.json(err);
      });
    // console.log("searchListBywords", data);
    res.json(data);
  };
}
export default new Film();
