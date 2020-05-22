import React, { Component } from "react";
import axios from "axios";
import { doctorAPI } from "./../../apis/requests";
import "../../css/register.css";

const errorMsg = {
  day:
    "تاریخ انتخاب شده باید حداقل ۱ روز قبل یا حداکثر ۲۱ روز بعد از تاریخ کنونی باشد.",
};

export class AddTurnForm extends Component {
  state = {
    errors: null,
    day: null,
    startTime: "",
    total: null,
  };

  static propTypes = {};

  onSubmit = (event) => {
    event.preventDefault();
    this.setState({ errors: null });
    const body = {
      start_time: this.state.startTime + ":00:00",
      day: this.state.day,
      total: this.state.total,
    };
    axios
      .post(doctorAPI("CALENDAR"), body, {})
      .then((res) => {
        this.props.onSubmit();
        this.refs.startTime.value = "";
        this.refs.day.value = "";
        this.refs.total.value = "";
      })
      .catch((err) => {
        this.setState({ errors: err.response });
      });
  };

  onChange = (event) =>
    this.setState({
      [event.target.name]: event.target.value,
    });

  render() {
    return (
      <div className="p-2">
        <form className="need-validated" onSubmit={this.onSubmit}>
          <div className="form-row">
            <div className="form-group col-md-4 text-right">
              <label htmlFor="day" className="float-right">
                تاریخ
              </label>
              <input
                type="date"
                className={
                  this.state.errors ? "form-control is-invalid" : "form-control"
                }
                id="day"
                name="day"
                placeholder="تاریخ"
                onChange={this.onChange}
                required
                ref="day"
              />
              {this.state.errors ? (
                <div className="invalid-feedback">{errorMsg["day"]}</div>
              ) : null}
            </div>
            <div className="form-group col-md-4 text-right">
              <label htmlFor="startTime" className="float-right">
                ساعت شروع
              </label>

              <input
                type="number"
                min="0"
                max="24"
                className="form-control"
                id="startTime"
                name="startTime"
                onChange={this.onChange}
                required
                placeholder="ساعت شروع ویزیت"
                ref="startTime"
              />
            </div>
            <div className="form-group col-md-4 text-right">
              <label htmlFor="total" className="float-right">
                تعداد بیمار
              </label>

              <input
                type="number"
                min="1"
                className="form-control"
                id="total"
                name="total"
                placeholder="تعداد بیماران"
                onChange={this.onChange}
                required
                ref="total"
              />
            </div>
          </div>
          <div className="form-group col-md">
            <button type="submit" className="btn profile-button mb-3 mt-2">
              اضافه کردن
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddTurnForm;
