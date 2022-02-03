import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import deleteInformation from "../../commonFunction/deleteInformation";
import useScript from "../../commonFunction/ReloadJs";
const ListOfSliderOffer = (props) => {
  useScript("/assets/js/app.js");

  const MySwal = withReactContent(Swal);
  const getSliderList = props.data.data;
  const [slider, updateSliderInfo] = useState(getSliderList);

  useEffect(() => {
    updateSliderInfo(getSliderList);
  }, [getSliderList]);

  const deleteItem = async (id) => {
    const formData = { tableName: "addSliderAndAds", idColumnName: "id", idValue: id };
    const response = await axios
      .post(process.env.API_URL + "/Delete", formData)
      .then((item) => {
        MySwal.fire("Good job!", "Delete information successfully", "success");
        deleteInformation(id, slider, getSliderList, updateSliderInfo);
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
              <h1>List of offer</h1>
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
                    List of offer
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
                      <th>S/L</th>
                      <th>Picture</th>
                      <th>Short discription</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {slider.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <img src={process.env.API_URL + "/upload/" + item.img} width={150} height={150} />
                        </td>
                        <td>
                          <input type="text" className="form-control" id="fname" name="shortDiscription" value="Short discription" />
                        </td>
                        <td>{item.title}</td>
                        <td>
                          <div className="form-check mb-0 py-2">
                            <input className="form-check-input" type="radio" name="toasts" id="success" defaultValue="success" defaultChecked />
                            <label className="form-check-label" htmlFor="success">
                              Active
                            </label>
                          </div>

                          <div className="form-check mb-0 py-2">
                            <input className="form-check-input" type="radio" name="toasts" id="info" defaultValue="info" />
                            <label className="form-check-label" htmlFor="info">
                              Inactive
                            </label>
                          </div>
                        </td>
                        <td>
                          <a href="javascript:void(0);" className="btn btn-block btn-outline-info">
                            Edit
                          </a>
                        </td>
                        <td>
                          <Link href="/ecommerce/edit/slider/[sliderId]" as={`/ecommerce/edit/slider/${item.id}`}>
                            <a className="btn btn-sm btn-outline-info">
                              <i className="fa fa-edit"></i>
                            </a>
                          </Link>
                          <a href="javascript:void(0)" onClick={() => deleteItem(item.id)} className="btn btn-sm btn-outline-danger ml-2">
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
  const { data } = await axios.get(process.env.API_URL + "/GetInformationSingle/addSliderAndAds&status='Offer'");

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data },
  };
}

export default ListOfSliderOffer;
