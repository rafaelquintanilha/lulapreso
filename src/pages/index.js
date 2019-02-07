import React from "react"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import moment from 'moment';
import { WhatsappShareButton, TwitterShareButton, FacebookShareButton } from 'react-share';
import { WhatsappIcon, TwitterIcon, FacebookIcon } from 'react-share';

class IndexPage extends React.Component {

  constructor() {
    super();
    this.state = { now: moment() };
    this.arrestDate = "2018-04-07";
  }

  componentWillMount() {
    this.interval = setInterval(() => {
      this.setState({now: moment()});
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  releaseDate = () => {
    const arrestDate = "2018-04-07";
    const sentences = [
      { years: 12, months: 1 },
      { years: 12, months: 11 }
    ];
    const totalYears = sentences.map(s => s.years).reduce((a, b) => a + b);
    const totalMonths = sentences.map(s => s.months).reduce((a, b) => a + b);
    return moment(arrestDate)
      .add(totalYears, 'years')
      .add(totalMonths, 'months');
  }
  
  remainingDays = () => moment(this.releaseDate()).diff(this.state.now, 'days');
  remainingYears = () => moment(this.releaseDate()).diff(this.state.now, 'years');
  remainingSeconds = () => moment(this.releaseDate()).diff(this.state.now, 'seconds');

  remainingTime = () => {
    const releaseDate = this.releaseDate();
    const remainingYears = this.remainingYears();
    const remainingMonths = (-1) * moment(this.arrestDate).add(remainingYears, 'years').diff(releaseDate, 'months');
    const remainingDays = moment(this.arrestDate)
      .add(remainingYears, 'years')
      .add(remainingMonths, 'months')
      .diff(releaseDate, 'days');

    const tomorrow = moment().add(1, 'day').hour(0).minute(0).second(0);
    const remainingHours = tomorrow.diff(this.state.now, 'hours');
    const remainingMinutes = tomorrow.diff(this.state.now, 'minutes') - remainingHours * 60;
    const remainingSeconds = tomorrow.diff(this.state.now, 'seconds') - remainingHours * 60 * 60 - remainingMinutes * 60;
    return { remainingYears, remainingMonths, remainingDays, remainingHours, remainingMinutes, remainingSeconds };
  }

  get remainingText() {
    const { remainingYears, remainingMonths, remainingDays, remainingHours, remainingMinutes, remainingSeconds } = this.remainingTime();
    return (
      <p>
        Faltam <strong>{remainingYears}</strong> anos,
        {' '}
        <strong>{remainingMonths}</strong> meses, 
        {' '}
        <strong>{remainingDays}</strong> dias,
        <br />
        <strong>{remainingHours}</strong> horas,
        {' '}
        <strong>{remainingMinutes}</strong> minutos,
        {' e '}
        <strong>{remainingSeconds}</strong> segundos na prisão.
      </p>
    );
  }

  render() {
    return (
      <Layout style={{margin: "auto"}}>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`, `lula`]} />
        <section>
          <div>
            <p><b>Lula</b> ficará preso até <strong>{this.releaseDate().format("DD/MM/YYYY")}</strong></p>
          </div>
        </section>
        <div style={{
          maxWidth: `500px`, 
          marginLeft: "auto", marginRight: "auto",
          boxShadow: "0px 0px 10px 5px #eee",
        }}>
          <Image />
        </div>
        <section>
          <div>
            {this.remainingText}
            <div className="social">
              <WhatsappShareButton
                title="Quanto tempo de prisão resta ao Lula?"
                url={window.location.href}
              >
                <div style={{cursor: "pointer"}}>
                  <WhatsappIcon size={64} round={true} />
                </div>
              </WhatsappShareButton>
              <TwitterShareButton
                title="Quanto tempo de prisão resta ao Lula?"
                url={window.location.href}
              >
                <div style={{cursor: "pointer"}}>
                  <TwitterIcon size={64} round={true} hashtags={["LulaTaPresoBabaca"]} />
                </div>
              </TwitterShareButton>
              <FacebookShareButton
                quote="Quanto tempo de prisão resta ao Lula?"
                url={window.location.href}
              >
                <div style={{cursor: "pointer"}}>
                  <FacebookIcon size={64} round={true} />
                </div>
              </FacebookShareButton>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

export default IndexPage