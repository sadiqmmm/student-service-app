import React, { Component } from "react";
import axios from "axios";

import loggedIn from "../helpers/logged-in";
import DashboardNavigation from "../partials/navigation";
import ListItem from "../partials/list-item";
import DataItem from "../partials/data-item";
import DataInputElement from "../partials/data-input-element";

export default class DataDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      title: "",
      currentClient: {},
      project: {},
      projectDataEndpoint: this.props.match.params.table_name,
      projectData: {
        headers: [],
        items: []
      }
    };

    this.getProjectDetails = this.getProjectDetails.bind(this);
    this.getData = this.getData.bind(this);
    this.dataList = this.dataList.bind(this);
    this.handleRecordDelete = this.handleRecordDelete.bind(this);
    this.createNewRecord = this.createNewRecord.bind(this);
    this.handleInputValueChange = this.handleInputValueChange.bind(this);
  }

  componentDidMount() {
    loggedIn()
      .then(res => {
        if (res.logged_in) {
          this.setState({ currentClient: res.current_client });
          this.getProjectDetails();
        } else {
          this.props.history.push("/");
        }
      })
      .catch(error => {
        console.log("not signed in", error);
      });
  }

  getProjectDetails() {
    axios
      .get(
        `https://api.devcamp.space/projects/${this.props.match.params.slug}`,
        {
          withCredentials: true
        }
      )
      .then(response => {
        this.setState({
          project: response.data.project,
          isLoading: false
        });
        this.getData();
      })
      .catch(error => {
        console.log("Errors");
      });
  }

  getSubdomain() {
    return this.state.currentClient.subdomain;
  }

  handleRecordDelete(event, id) {
    axios
      .delete(
        `https://${this.getSubdomain()}.devcamp.space/${this.state.project
          .route_namespace}/${this.state.projectDataEndpoint}/${id}`,
        {
          withCredentials: true
        }
      )
      .then(response => {
        const filteredRecords = this.state.projectData.items.filter(
          dataRecord => {
            return dataRecord.id !== id;
          }
        );

        this.setState({
          projectData: {
            headers: this.state.projectData.headers,
            items: [...filteredRecords]
          }
        });

        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
    event.preventDefault();
  }

  dataList() {
    return this.state.projectData.items.map(item => {
      return (
        <DataItem
          key={item.id}
          data={Object.values(item)}
          handleRecordDelete={e => this.handleRecordDelete(e, item.id)}
        />
      );
    });
  }

  getData() {
    axios
      .get(
        `https://${this.getSubdomain()}.devcamp.space/${this.state.project
          .route_namespace}/${this.state.projectDataEndpoint}`,
        {
          withCredentials: true
        }
      )
      .then(response => {
        const collectionReceived =
          response.data[this.state.projectDataEndpoint];

        if (collectionReceived.length > 0) {
          this.setState({
            projectData: {
              items: [...collectionReceived],
              headers: collectionReceived[0]["column_names_merged_with_images"]
            }
          });
        }
      })
      .catch(error => {
        console.log("Errors", error);
      });
  }

  buildForm() {
    let formData = new FormData();
    // formData.append("portfolio_item[name]", "MySpace");
    // formData.append("portfolio_item[description]", "Some desc");
    // formData.append("portfolio_item[url]", "https://myspace.com");
    return formData;
  }

  createNewRecord(event) {
    const dataModelName = this.state.projectDataEndpoint.slice(0, -1);
    axios
      .post(
        `https://${this.getSubdomain()}.devcamp.space/${this.state.project
          .route_namespace}/${this.state.projectDataEndpoint}`,
        this.buildForm(),
        {
          withCredentials: true
        }
      )
      .then(response => {
        this.setState({
          projectData: {
            headers: this.state.projectData.headers,
            items: [
              ...this.state.projectData.items,
              response.data[dataModelName]
            ]
          }
        });
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
    event.preventDefault();
  }

  handleInputValueChange(event, name) {
    const dataModelName = this.state.projectDataEndpoint.slice(0, -1);
    this.setState({
      [`${dataModelName}[${name}]`]: event.target.value
    });

    console.log(
      Object.keys(this.state).filter(el => el.startsWith(dataModelName))
    );
  }

  // TODO
  // Create ability to add records
  // continue building out the handleInputValueChange function
  //  and connect it with the buildForm
  //  and create a black list of attrs (id, etc)
  //  and then change the input types for photos
  // Implement the ability to edit records
  // Filter for links with regex
  // Show images
  // Add other projects

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }

    const {
      title,
      language,
      white_logo,
      slug,
      route_namespace
    } = this.state.project;
    const { subdomain } = this.state.currentClient;

    const recordsInDatabase = this.state.projectData.items.length > 0;

    const headers = this.state.projectData.headers.map(header => {
      return <span key={header}>{header}</span>;
    });

    const inputElements = this.state.projectData.headers.map(header => {
      return (
        <DataInputElement
          key={header}
          name={header}
          handleInputValueChange={e => this.handleInputValueChange(e, header)}
        />
      );
    });

    return (
      <div>
        <DashboardNavigation />

        <div className="project-detail-header">
          <img src={white_logo} alt={slug} />
          <h1>{title}</h1>
        </div>

        <div className="card">
          <div
            className={
              recordsInDatabase ? (
                `list-headers-${this.state.projectData.headers.length + 1}`
              ) : (
                ""
              )
            }
          >
            {recordsInDatabase ? headers : ""}
          </div>
          <div>{recordsInDatabase ? this.dataList() : ""}</div>
        </div>

        <div className="card">
          <h2>Add a record</h2>

          <form onSubmit={this.createNewRecord} className="form-wrapper">
            <div className="input-elements three-icon-grid">
              <i className="fas fa-link" />
              <div className="form-element-group">{inputElements}</div>

              <button type="submit">
                <i className="far fa-plus-square" />
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
