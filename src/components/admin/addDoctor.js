import React, { Component } from "react";
import "../../css/register.css";
import Sidebar from "../admin/sidebar";

class addDoctor extends Component {
  state = {
    firstName: "",
    lastName: "",
    gender: "",
    birthDate: "",
    phone: "",
    address: "",
    speciality: "",
    bio: "",
    showingAlert: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  render() {
    const {
      firstName,
      lastName,
      gender,
      birthDate,
      phone,
      address,
      speciality,
      bio,
    } = this.state;

    return (
      <div className="wrapper">
        <Sidebar />
        <div id="content">
          <div className="my-Register-page">
            <div className="my-Register-card card text-right">
              <h5 className="card-header text-body text-center pt-3 font-weight-bold">
                ثبت نام پزشک
              </h5>
              <div className="card-body">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-row">
                    <div className="form-group col-md">
                      <label htmlFor="firstName" className="float-right">
                        نام
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder="نام"
                        onChange={this.handleChange}
                        value={firstName}
                      />
                    </div>
                    <div className="form-group col-md">
                      <label htmlFor="lastName" className="float-right">
                        نام خانوادگی
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        placeholder="نام خانوادگی"
                        onChange={this.handleChange}
                        value={lastName}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md">
                      <label htmlFor="birthDate" className="float-right">
                        تاریخ تولد
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="birthDate"
                        placeholder="تاریخ تولد"
                        onChange={this.handleChange}
                        value={birthDate}
                      />
                    </div>
                    <div className="form-group col-md">
                      <label htmlFor="phone" className="float-right">
                        شماره تلفن
                      </label>
                      <input
                        dir="ltr"
                        type="tel"
                        className="form-control"
                        id="phone"
                        placeholder="0912xxxxxxx"
                        onChange={this.handleChange}
                        value={phone}
                      />
                    </div>
                    <div className="form-group col-md">
                      <label htmlFor="speciality" className="float-right">
                        تخصص
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="speciality"
                        placeholder="تخصص"
                        onChange={this.handleChange}
                        value={speciality}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md">
                      <label htmlFor="address" className="float-right">
                        آدرس
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        placeholder="آدرس"
                        onChange={this.handleChange}
                        value={address}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="bio" className="float-right">
                      درباره شما
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="bio"
                      placeholder="فوق تخصص بیماری های ریه و مراقبت های ویژه ..."
                      onChange={this.handleChange}
                      value={bio}
                    />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="gender"
                      className="float-right"
                      value={gender}
                      onChange={this.handleChange}
                    >
                      جنسیت
                    </label>
                    <select id="gender">
                      <option>مرد</option>
                      <option>زن</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary z-depth-0 btn-block mb-2"
                  >
                    افزودن پزشک
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="overlay"></div>
      </div>
    );
  }
}

export default addDoctor;
