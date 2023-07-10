import "./index.css";
import axios from "axios";
import { connect } from "react-redux";

function Left(props) {
  const getList = async () => {
    const res = await axios.get("http://127.0.0.1/api/list");
    const {
      data: { data: result },
    } = res;
    props.getList(result);
  };
  return (
    <div className="left">
      <button onClick={getList}>获取接口数据</button>
    </div>
  );
}

const mapDispatchToProps = (dispath) => {
  return {
    getList: (list) => {
      dispath({
        type: "send",
        value: list,
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(Left);
