import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import useScript from "../../commonFunction/ReloadJs";
const ListOfAgent = (props) => {
  useScript("/assets/js/app.js");

  const MySwal = withReactContent(Swal);
  const getAgentList = props.data;
  console.log(getAgentList);
  const [agent, updateAgentInfo] = useState(getAgentList);

  useEffect(() => {
    updateAgentInfo(getAgentList);
  }, [getAgentList]);
  const deleteItem = async (id) => {
    const formData = { tableName: "product", idColumnName: "id", idValue: id };
    const response = await axios
      .post(process.env.API_URL + "/Delete", formData)
      .then((item) => {
        MySwal.fire("Good job!", "Delete information successfully", "success");
        deleteInformation(id, agent, getAgentList, updateAgentInfo);
      })
      .catch((error) => {
        MySwal.fire("Brand not saved!", "Something Error Found.", "warning");
      });
  };
  return (
    <div>
      <div className="row">
        <div className="col-md-12 m-b-30">
          <div className="d-block d-sm-flex flex-nowrap align-items-center">
            <div className="page-title mb-2 mb-sm-0">
              <h1>List of agent</h1>
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
                    List of agent
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
                      <th>Picture</th>
                      <th>Name</th>
                      <th>Number</th>
                      <th>Email</th>
                      <th>Details</th>
                      <th>Join date</th>
                      <th>Active/Inactive</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {agent.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <img src={process.env.API_URL + "/upload/" + JSON.parse(item.img)} width={150} height={150} />
                        </td>

                        <td>Amir hamza</td>
                        <td>57684576</td>
                        <td>test@gmail.com</td>
                        <td>
                          <a href="javascript:void(0);" className="btn btn-block btn-outline-info">
                            Agent details
                          </a>
                        </td>
                        <td>24/10/2021</td>
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
                          <Link href="/ecommerce/edit/product/[productId]" as={`/ecommerce/edit/product/`}>
                            <a className="btn btn-sm btn-outline-info">
                              <i className="fa fa-edit"></i>
                            </a>
                          </Link>
                        </td>
                        <td>
                          <a href="javascript:void(0);" onClick={() => deleteItem(item.id)} className="btn btn-block btn-square btn-outline-danger">
                            Delete
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
  const { data } = await axios.get(process.env.API_URL + "/GetAllProduct");

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data },
  };
}

export default ListOfAgent;
