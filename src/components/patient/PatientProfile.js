import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { userAPI } from "./../../apis/requests";
import Loading from "./../layout/Loading";
import "./../../css/profile.css";
import EditIcon from "./../../static/icons/edit_icon.svg";
import EditDialog from "./../layout/EditDialog";
import ChangePasswordDialog from "./../layout/ChangePasswordDialog";
import SideBar from "./../layout/SideBar";
import SideBarToggler from "./../layout/SideBarToggler";
import Swal from "sweetalert2";

export class PatientProfile extends Component {
  state = {
    showingAlert: false,
    patient: null,
    editField: null,
  };

  static propTypes = {
    auth: PropTypes.object,
  };

  onEdit = (field) => {
    this.setState({ editField: field });
  };

  handleDelete = (event) => {
    event.preventDefault();
    const { id } = this.props.match.params;
    Swal.fire({
      title: "آيا مطمئن هستید؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2cbdb1f6",
      cancelButtonColor: "#d33",
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
    }).then((result) => {
      if (result.value) {
        axios
          .delete(userAPI("MANAGE_PATIENTS", id))
          .then((res) => {
            this.props.history.push("/patients");
            Swal.fire({
              title: "حذف با موفقیت انجام شد",
              icon: "success",
            });
          })
          .catch((err) => {
            Swal.fire({
              title: "حذف ناموفق بود",
              icon: "error",
            });
          });
      }
    });
  };

  handleToggleSidebar = (event) => {
    event.preventDefault();
    this.setState({
      isActive: !this.state.isActive,
    });
  };
  async componentDidMount() {
    if (this.props.auth.user.role === 2) {
      await axios
        .get(userAPI("PROFILE"))
        .then((res) => this.setState({ patient: res.data }));
    } else if (this.props.auth.user.role === 0) {
      await axios
        .get(userAPI("MANAGE_PATIENTS", this.props.match.params.id))
        .then((res) => this.setState({ patient: res.data }));
    }
  }
  render() {
    return this.state.patient ? (
      <div className="wrapper">
        <SideBar />
        <div id="content">
          <SideBarToggler />
          <div className="my-Register-page">
            <div
              className={
                this.props.isActive
                  ? "my-Register-card card text-right active"
                  : "my-Register-card card text-right"
              }
            >
              <div className="text-center card-header">
                <img
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                  }}
                  src={this.state.patient.avatar}
                  alt="تصویر پروفایل"
                ></img>
                <button
                  type="button"
                  className="btn float-right p-0"
                  data-toggle="modal"
                  data-target="#editDialog"
                  onClick={() => {
                    this.onEdit("avatar");
                  }}
                >
                  <img
                    src={EditIcon}
                    style={{
                      width: "20px",
                      height: "20px",
                    }}
                    alt="ویرایش"
                  ></img>
                </button>
              </div>
              <div className="card-body">
                <div className="form-row">
                  <div className="form-group col-md">
                    <label htmlFor="firstName" className="float-right ml-2">
                      نام:
                      {this.state.patient.first_name}
                      <button
                        type="button"
                        className="btn float-left p-0"
                        data-toggle="modal"
                        data-target="#editDialog"
                        onClick={() => {
                          this.onEdit("first_name");
                        }}
                      >
                        <img
                          src={EditIcon}
                          style={{
                            width: "20px",
                            height: "20px",
                          }}
                          alt="ویرایش"
                        ></img>
                      </button>
                    </label>
                  </div>
                  <div className="form-group col-md">
                    <label htmlFor="lastName" className="float-right ml-2">
                      نام خانوادگی:
                      {this.state.patient.last_name}
                      <button
                        type="button"
                        className="btn float-left p-0"
                        data-toggle="modal"
                        data-target="#editDialog"
                        onClick={() => {
                          this.onEdit("last_name");
                        }}
                      >
                        <img
                          src={EditIcon}
                          style={{
                            width: "20px",
                            height: "20px",
                          }}
                          alt="ویرایش"
                        ></img>
                      </button>
                    </label>
                  </div>
                  <div className="form-group col-md">
                    <label htmlFor="lastName" className="float-right ml-2">
                      کدملی:
                      {this.state.patient.user.username}
                    </label>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md">
                    <label htmlFor="birthDate" className="float-right ml-2">
                      تاریخ تولد:
                      <label style={{ direction: "ltr" }}>
                        {this.state.patient.birth_date}
                      </label>
                      <button
                        type="button"
                        className="btn float-left p-0"
                        data-toggle="modal"
                        data-target="#editDialog"
                        onClick={() => {
                          this.onEdit("birth_date");
                        }}
                      >
                        <img
                          src={EditIcon}
                          style={{
                            width: "20px",
                            height: "20px",
                          }}
                          alt="ویرایش"
                        ></img>
                      </button>
                    </label>
                  </div>
                  <div className="form-group col-md">
                    <label htmlFor="phone" className="float-right ml-2">
                      شماره موبایل:
                      {this.state.patient.mobile_number}
                      <button
                        type="button"
                        className="btn float-left p-0"
                        data-toggle="modal"
                        data-target="#editDialog"
                        onClick={() => {
                          this.onEdit("mobile_number");
                        }}
                      >
                        <img
                          src={EditIcon}
                          style={{
                            width: "20px",
                            height: "20px",
                          }}
                          alt="ویرایش"
                        ></img>
                      </button>
                    </label>
                  </div>
                  <div className="form-group col-md">
                    <label htmlFor="phone" className="float-right ml-2">
                      جنسیت:
                      {this.state.patient.gender ? (
                        <label>زن</label>
                      ) : (
                        <label>مرد</label>
                      )}
                    </label>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md">
                    <label htmlFor="address" className="float-right ml-2">
                      ایمیل:
                      <label style={{ direction: "ltr" }}>
                        {this.state.patient.user.email}
                      </label>
                      <button
                        type="button"
                        className="btn float-left p-0"
                        data-toggle="modal"
                        data-target="#editDialog"
                        onClick={() => {
                          this.onEdit("user.email");
                        }}
                      >
                        <img
                          src={EditIcon}
                          style={{
                            width: "20px",
                            height: "20px",
                          }}
                          alt="ویرایش"
                        ></img>
                      </button>
                    </label>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md">
                    <label htmlFor="address" className="float-right ml-2">
                      آدرس:
                      {this.state.patient.address}
                      <button
                        type="button"
                        className="btn float-left p-0"
                        data-toggle="modal"
                        data-target="#editDialog"
                        onClick={() => {
                          this.onEdit("address");
                        }}
                      >
                        <img
                          src={EditIcon}
                          style={{
                            width: "20px",
                            height: "20px",
                          }}
                          alt="ویرایش"
                        ></img>
                      </button>
                    </label>
                  </div>
                </div>
                {this.props.auth.user.role !== 0 ? (
                  <button
                    type="button"
                    data-toggle="modal"
                    data-target="#changePassDialog"
                    className="btn btn-secondary "
                  >
                    تغییر رمز عبور
                  </button>
                ) : null}
                {this.props.auth.user.role === 0 ? (
                  <button
                    type="button"
                    onClick={this.handleDelete}
                    className="btn delete-button"
                    style={{ float: "left" }}
                  >
                    حذف
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="overlay"></div>
        <EditDialog
          field={this.state.editField}
          api={
            this.props.auth.user.role === 2
              ? userAPI("PROFILE")
              : userAPI("MANAGE_PATIENTS", this.props.match.params.id)
          }
        />
        {this.props.auth.user.role !== 0 ? <ChangePasswordDialog /> : null}
      </div>
    ) : (
      <Loading />
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  isActive: state.sidebar.active,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PatientProfile);
