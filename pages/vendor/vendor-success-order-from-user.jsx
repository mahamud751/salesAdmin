import axios from "axios";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { storeListOfVendorSuccessOrder } from "../../atom/listOfVendor";
import useScript from "../../commonFunction/ReloadJs";

const VendorSuccessOrderFromUser = (props) => {
  useScript("/assets/js/app.js");

  const getVendorSuccessOrder = props.data;
  console.log(getVendorSuccessOrder);
  const [VendorDailyOrder, updateVendorSuccessOrder] = useRecoilState(storeListOfVendorSuccessOrder);

  useEffect(() => {
    updateVendorSuccessOrder(getVendorSuccessOrder);
  }, [updateVendorSuccessOrder]);
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
  const VendorSuccessOrders = useRecoilValue(storeListOfVendorSuccessOrder);
  console.log(VendorSuccessOrders);
  return (
    <div>
      <div className="row">
        <div className="col-md-12 m-b-30">
          <div className="d-block d-sm-flex flex-nowrap align-items-center">
            <div className="page-title mb-2 mb-sm-0">
              <h1>List of success order from user</h1>
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
                    List of success order from user
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
                      <th>Status</th>
                      <th>Invoice</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {VendorSuccessOrders.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <th>Vendor id</th>
                        <th>Name</th>
                        <th>Number</th>
                        <th>Email</th>
                        <th>Date</th>
                        <th>Total product</th>
                        <th>Total qty</th>
                        <th>Total amount</th>
                        <th>Status</th>
                        <th>Invoice</th>
                        <th>Delete</th>
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
export default VendorSuccessOrderFromUser;
