import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import deleteInformation from "../../commonFunction/deleteInformation";
import useScript from "../../commonFunction/ReloadJs";

const ListOfSubCategory = (props) => {
  useScript("/assets/js/app.js");

  const MySwal = withReactContent(Swal);

  const editSubCategory = (id) => {
    alert(id);
  };

  const newData = props.data
    .map((item) =>
      item.categorySubs.map((item1) => ({
        cat: item.title,
        subcatid: item1.id,
        subcat: item1.title,
        desktopIcon: item1.desktopicon,
        mobileIcon: item1.mobileicon,
      }))
    )
    .flat();

  const getListOfSubCategory = newData;
  const [subCategory, updateSubCategory] = useState(getListOfSubCategory);

  useEffect(() => {
    updateSubCategory(getListOfSubCategory);
  }, [getListOfSubCategory]);

  const deleteItem = async (id) => {
    const formData = { tableName: "categorySub", idColumnName: "id", idValue: id };
    const response = await axios
      .post(process.env.API_URL + "/Delete", formData)
      .then((item) => {
        MySwal.fire("Good job!", "Delete information successfully", "success");
        deleteInformation(id, subCategory, getListOfSubCategory, updateSubCategory);
      })
      .catch((error) => {
        MySwal.fire("information not delete !", "Something Error Found.", "warning");
      });
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-12 m-b-30">
          <div className="d-block d-sm-flex flex-nowrap align-items-center">
            <div className="page-title mb-2 mb-sm-0">
              <h1>List of Subcategory</h1>
            </div>
            <div className="ml-auto d-flex align-items-center">
              <nav>
                <ol className="breadcrumb p-0 m-b-0">
                  <li className="breadcrumb-item">
                    <a href="index.html">
                      <i className="ti ti-home" />
                    </a>
                  </li>
                  <li className="breadcrumb-item">Tables</li>
                  <li className="breadcrumb-item active text-primary" aria-current="page">
                    List of Subcategory
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card card-statistics">
            <div className="card-body">
              <div className="datatable-wrapper table-responsive">
                <table id="datatable" className="display compact table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>Serial</th>
                      <th>Category name</th>
                      <th>Subcategory name</th>
                      <th>Icon</th>
                      <th>Icon</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subCategory.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.cat}</td>
                        <td>{item.subcat}</td>
                        <td>{item.desktopIcon}</td>
                        <td>{item.mobileIcon}</td>
                        <td>
                          <a href="javascript:void(0)" onClick={() => editSubCategory(item.subcatid)} className="btn btn-sm btn-outline-info">
                            <i className="fa fa-edit"></i>
                          </a>
                          <a href="javascript:void(0)" onClick={() => deleteItem(item.subcatid)} className="btn btn-sm btn-outline-danger ml-2">
                            <i className="fa fa-trash"></i>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { data } = await axios.get(process.env.API_URL + "/GetCategoryData");
  return {
    props: { data },
  };
}

export default ListOfSubCategory;
