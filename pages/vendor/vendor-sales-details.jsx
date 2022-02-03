import axios from "axios";
import Link from "next/link";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { storeListOfVendorSalesDetails } from "../../atom/listOfVendor";
import useScript from "../../commonFunction/ReloadJs";

const ListOfVendorSales = (props) => {
  useScript("/assets/js/app.js");

  const getVendorSalesDetailsList = props.data;
  console.log(getVendorSalesDetailsList);
  const [vendorSalesDetail, updateVendorSalesDetails] = useRecoilState(storeListOfVendorSalesDetails);

  useEffect(() => {
    updateVendorSalesDetails(getVendorSalesDetailsList);
  }, [updateVendorSalesDetails]);
  // const deleteItem = async (id) => {
  //   const formData = { tableName: "product", idColumnName: "id", idValue: id };
  //   const response = await axios
  //     .post(process.env.API_URL + "/Delete", formData)
  //     .then((item) => {
  //       MySwal.fire("Good job!", "Delete information successfully", "success");
  //       deleteInformation(id, product, getPendingProductList, updateProductInfo);
  //     })
  //     .catch((error) => {
  //       MySwal.fire("Brand not saved!", "Something Error Found.", "warning");
  //     });
  // };
  const vendorSalesDetails = useRecoilValue(storeListOfVendorSalesDetails);
  console.log(vendorSalesDetails);
  return (
    <div>
      <div className="row">
        <div className="col-md-12 m-b-30">
          <div className="d-block d-sm-flex flex-nowrap align-items-center">
            <div className="page-title mb-2 mb-sm-0">
              <h1>List of vendor sales</h1>
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
                    List of vendor sales
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
                      <th>Vendor id</th>
                      <th>Name</th>
                      <th>Number</th>
                      <th>Email</th>
                      <th>Date</th>
                      <th>Total product</th>
                      <th>Total qty</th>
                      <th>Total amount</th>
                      <th>Invoice</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendorSalesDetails.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        {/* <td>
                          <img src={process.env.API_URL + "/upload/" + JSON.parse(item.img)} width={150} height={150} />
                        </td> */}

                        <td>{item.name}</td>
                        {/* <td>
                          <td>
                            <a href="javascript:void(0);" className="btn btn-block btn-outline-info">
                              Information
                            </a>
                          </td>
                        </td>
                        <td>{item.memberDetails[0].name}</td>
                        <td>
                          <a href="javascript:void(0);" className="btn btn-block btn-outline-info">
                            {item.invoiceNumber}
                          </a>
                        </td>
                        <td>{item.memberDetails[0].number}</td>
                        <td>{item.memberDetails[0].email}</td> */}
                        {/* <td>Dhaka</td>
                        <td>Cash on delivery</td>
                        <td>dhaka</td>
                        <td>{item.totalProduct}</td>
                        <td>{item.totalQty}</td>
                        <td>{item.totalPrice}</td>
                        <td>
                          <label className="badge mb-0 badge-warning-inverse">{item.status}</label>
                        </td> */}
                        <td>
                          <Link href="/ecommerce/edit/product/[productId]" as={`/ecommerce/edit/product/${item.id}`}>
                            <a className="btn btn-sm btn-outline-info">
                              <i className="fa fa-edit"></i>
                            </a>
                          </Link>
                        </td>
                        <td>
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
  const { data } = await axios.get("https://jsonplaceholder.typicode.com/users");
  // console.log(data)
  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data },
  };
}

export default ListOfVendorSales;
