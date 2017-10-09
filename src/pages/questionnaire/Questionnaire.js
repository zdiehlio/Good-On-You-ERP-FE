import React, { Component } from 'react'
import './Questionnaire.css'
import axios from 'axios'
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Question, Answer, ProgressBar } from '../../components';
import { fetchAllQuestions } from '../../actions';
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import _ from 'lodash'

const submitButtonStyle = {
  margin: 12
};

const muiTheme = getMuiTheme({
  palette: {
    textColor: '#004D40',
    primary1Color: '#09b5ab'
  }
});

class Questionnaire extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: {},
      answeredData: [[]],
      currentQuestion: 0,
      selected: [],
      page: 0,
      mappedQuestions: [],
      categories: [],
      subPage: 0,
      subPageTotal: 0,
      currentTheme: 0,
      rawAnswerList: [],
      open: false,
      openEvidenceDialog: false,
      errr: {message: null}
    };

    // this.getData = this.getData.bind(this)
  }

  getData(brandId, themeId) {
    // get data from JSON
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt');
    axios.get("/spec.json")
      .then(res => {
        this.setState({
          categories: res.data.categories
        })
        this.mapQuestionTypes(brandId, themeId)
      })
  }

  // retrive list of question for theme in spec.json
  mapQuestionTypes(brandId, themeId) {

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt');
    axios.get(`http://34.211.121.82:3030/questions?theme_id=${themeId}`)
      .then(res => {
        if(res.data.data.length > 0) {
          this.setState({
            mappedQuestions: res.data.data
          })
          console.log(this.state.mappedQuestions);

          axios.get(`http://34.211.121.82:3030/brand-answers?brand_id=${brandId}&theme_id=${themeId}`)
            .then(response => {
              console.log(response);
              this.setState({
                rawAnswerList: response.data.data,
                currentQuestion: (res.data.total < response.data.data.length) ? res.data.total - 1: (response.data.data.length > 0) ? response.data.data.length : 0,
                finished: res.data.total <= response.data.data.length,
                total: res.data.total
              })

              axios.get(`http://34.211.121.82:3030/questions`)
                .then(response => {
                  this.setState({
                    questionSum: response.data.total
                  })

                  axios.get(`http://34.211.121.82:3030/brand-answers?brand_id=${brandId}`)
                    .then(response => {
                      this.setState({
                        totalAnswered: response.data.total,
                        page: 1
                      })
                    })
                })
            })

        } else {
          this.setState({
            page: 2
          })
        }

        axios.get(`http://34.211.121.82:3030/brands/${brandId}`)
          .then(response => {
            console.log(response);
            this.setState({
              brandName: response.data.name,
              brandUrl: response.data.url
            })
          })

      })
    }

  componentWillMount(){
    const {brandId, themeId} = this.props.match.params
    console.log(brandId);
    if(!sessionStorage.userId || !brandId) {
      this.props.history.push("/")
    } else {
      // this.props.fetchAllQuestions();
      this.getData(brandId,themeId);
    }
  }

  handleOpen = () => {
     this.setState({open: true});
   };

  handleSaveQuestionActionClose = () => {
    this.setState({openEvidenceDialog: false});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleDiscard = () => {
    this.props.history.push(`/brandsummary/${this.props.match.params.brandId}`)
  };

  handleSaveQuestion = (value) => {
    const {brandId} = this.props.match.params


    const { currentTheme, currentQuestion, mappedQuestions } = this.state
    const mapAnswer = Object.keys(_.omit(value, ['url', 'comment']))

    if (mapAnswer.length > 0) {
      if (!value.url && !value.comment) {
        // display message alert
        this.setState({openEvidenceDialog: true});
        return
      }
    }

    this.setState({
      page: 0
    })


    var answerObject = {
     brand_id: brandId,
     theme_id: mappedQuestions[currentQuestion].theme_id,
     question_id: mappedQuestions[currentQuestion].question_id,
     answer_ids: mapAnswer,
     url: value.url,
     comment: value.comment,
     user_id: sessionStorage.userId
    }

    console.log(answerObject);

    // call apis tomsave answer for brand in the daatabase and get all the answers id for the currentTheme
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt');
    axios.post(`http://34.211.121.82:3030/brand-answers`, answerObject).then(res => {
      axios.get(`http://34.211.121.82:3030/brand-answers?brand_id=${brandId}&theme_id=${this.state.mappedQuestions[this.state.currentQuestion].theme_id}`)
        .then(res => {
          const rawAnswerList = res.data.data
          console.log(res.data.data);

          // if (this.state.mappedQuestions[this.state.currentTheme].length-1 == currentQuestion) {
          //   this.props.history.push("/brandSummary")
          // }

          this.setState({
            currentQuestion: this.state.total <= res.data.data.length ? this.state.total - 1 : this.state.currentQuestion + 1,
            finished: this.state.total <= res.data.data.length ? true : false,
            rawAnswerList: rawAnswerList
          })

          axios.get(`http://34.211.121.82:3030/brand-answers?brand_id=${this.props.match.params.brandId}`)
            .then(response => {
              this.setState({
                totalAnswered: response.data.total,
                page: 1
              })
            })

        })
    });



    // use api to save questions response
    // call api to get all responses for the current theme to be displayed at the bottom
      // http://34.211.121.82:3030/brand-answers?brand_id=DxXvQiEE9MICosFv&theme_id=water to get array of question id and array of asnwers id
      // using the array of question id and aswer id to get the text description of the questions and answers



      // console.log(theme.theme_id);

    // change the state of the current question to display the next question
  }

  handleSelectionChange = (event) => {

    if (!event.target.checked) {
      var stateCopy = this.state.selected
      stateCopy.splice(this.state.selected.indexOf(event.target.name),1)
      this.setState({
        selected: stateCopy
      })
    } else {
      var stateCopy = this.state.selected
      stateCopy.push(event.target.name)
      this.setState({
        selected: stateCopy
      })
    }
  }



  renderPage = () => {

    const saveQuestionAction = [
        <FlatButton
          label="OK"
          primary={true}
          onClick={this.handleSaveQuestionActionClose}
        />
      ];

    const actions = [
        <FlatButton
          label="Cancel"
          primary={true}
          onClick={this.handleClose}
        />,
        <FlatButton
          label="Discard"
          primary={true}
          onClick={this.handleDiscard}
        />,
      ];

    switch (this.state.page) {
      case 0:
      return(
        <h2>Loading...</h2>
      )
      case 1:
      return (
        <div>
          <div className="summary-container-main flex-start">
            <div className="summary-container-left-solo">
              <div className="summary-header-row">
                <p className="label">Brand summary for:</p>
                <p className="value brand">{this.state.brandName}</p>
              </div>
              <div className="summary-header-row">
                <p className="label">Url</p>
                <p className="value">{this.state.brandUrl}</p>
              </div>
            </div>
          </div>

          <div className="summary-container-footer">
            <div className="label status-pagination">
              <p>
                <span>Brand Overview</span><span className="goy-color arrow-head">>></span>
                <span className="goy-color">Rating</span><span className="goy-color arrow-head">>></span>
                <span>Qualitative Ratings</span><span className="goy-color arrow-head">>></span>
                <span>Supplementary Data</span>
              </p>
            </div>
          </div>

          <div className="brand-summary-button-container">
            <MuiThemeProvider muiTheme={muiTheme}>
            <RaisedButton
              style={submitButtonStyle}
              primary={true}
              onClick={this.handleOpen}
              label="Go To Brand Summary"/>
            </MuiThemeProvider>
          </div>



          <div className="container-body">
            <div className="App">
            <h2 className="category-text">
              {
                `${this.state.mappedQuestions[this.state.currentQuestion].category_id} > ${this.state.mappedQuestions[this.state.currentQuestion].theme_id}`
              }
            </h2>
              <ProgressBar
                total = {this.state.questionSum}
                currentQuestion = {this.state.totalAnswered}
                desc = "Total"
                color = "green"
              />
              <ProgressBar
                total = {this.state.mappedQuestions.length}
                currentQuestion = {this.state.currentQuestion + 1}
                desc = "Current"

              />
              {this.state.finished ? (<div></div>) :
                (<Question
                  question={
                    this.state.mappedQuestions[this.state.currentQuestion]
                  }
                  answers={
                   [].concat(this.state.mappedQuestions[this.state.currentQuestion].answers)
                  }
                  currentQuestion = {this.state.currentQuestion}
                  handleSaveQuestion = {this.handleSaveQuestion}
                  handleSelectionChange = {this.handleSelectionChange}
                  disabled = {this.state.selected.length == 0}
                  selected = {this.state.selected}
                ></Question>
                )
              }

              <MuiThemeProvider muiTheme={muiTheme}>
                <Dialog
                  actions={actions}
                  modal={false}
                  open={this.state.open}
                  onRequestClose={this.handleClose}
                >
                  Go back to Brand Summary and discard changes?
                </Dialog>
              </MuiThemeProvider>
              <MuiThemeProvider muiTheme={muiTheme}>
                <Dialog
                  title="Missing Evidence"
                  actions={saveQuestionAction}
                  modal={true}
                  open={this.state.openEvidenceDialog}
                >
                  Please provide a source URL or comment as evidence.
                </Dialog>
              </MuiThemeProvider>

              {this.state.rawAnswerList.map((answer,i) => {
              return <Answer key={i} rawAnswer={answer} handleEditAnswer={this.handleEditAnswer}/>
            })}
              <Answer/>
            </div>
          </div>
        </div>
      )
      case 2:
        return(
            <div className="summary-container-main flex-start">
              <div className="questionare-header-container flex-start">
                <div className="summary-container-left-solo">
                  <div className="summary-header-row">
                    <p className="label">Brand summary for:</p>
                    <p className="value brand">{this.state.brandName}</p>
                  </div>
                  <div className="summary-header-row">
                    <p className="label">Url</p>
                    <p className="value">{this.state.brandUrl}</p>
                  </div>
                </div>
                <div className="brand-summary-button-container add-margin">
                  <MuiThemeProvider muiTheme={muiTheme}>
                  <RaisedButton
                    containerElement={<Link to={`/brandSummary/${this.props.match.params.brandId}`} />}
                    style={submitButtonStyle}
                    primary={true}
                    label="Go To Brand Summary"/>
                  </MuiThemeProvider>
                </div>
                <p>No questions for the current theme</p>
              </div>

            </div>

        )
      default:
        return (<div></div>)
    }
  }

  render() {
    return (
      <div>
          {this.renderPage()}
      </div>
    )
  }
}

// function validate(values){
//   // console.log(values) -> {title: 'dksajkd', categories: "dkjsad", content: "kdsjakdj"}
//
//   const errors = {}
//   const mapAnswer = Object.keys(_.omit(values, ['url', 'comment']))
//   console.log(mapAnswer.length);
//   if (mapAnswer.length > 0) {
//     if (!values.url && !values.comment) {
//         errors.message = "error"
//     }
//   }
//   return errors
// }





function mapStateToProps(state, ownProps) {
  return { data: state.qa }
}

export default reduxForm({
  form: "AnswerForm"
})(
  connect(mapStateToProps, { fetchAllQuestions })(Questionnaire)
)
