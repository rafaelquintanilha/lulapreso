import React from "react"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import moment from 'moment';
import { WhatsappShareButton, TwitterShareButton, EmailShareButton } from 'react-share';
import { WhatsappIcon, TwitterIcon, EmailIcon } from 'react-share';

class IndexPage extends React.Component {

  constructor() {
    super();
    this.state = { now: moment() };
    this.arrestDate = "2018-04-07";
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({now: moment()});
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  releaseDate = () => {
    const sentences = [
      { years: 12, months: 1 },
      { years: 12, months: 11 }
    ];
    const totalYears = sentences.map(s => s.years).reduce((a, b) => a + b);
    const totalMonths = sentences.map(s => s.months).reduce((a, b) => a + b);
    return moment(this.arrestDate)
      .add(totalYears, 'years')
      .add(totalMonths, 'months');
  }

  remainingTime = () => {
    const releaseDate = this.releaseDate();
    const remainingYears = moment(releaseDate).diff(this.state.now, 'years');
    const remainingMonths = moment(releaseDate).diff(this.state.now, 'months') % 12;
    const remainingDays = moment(releaseDate)
      .subtract(remainingYears, 'years')
      .subtract(remainingMonths, 'months')
      .diff(this.state.now, 'days');
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
        Restam <strong>{remainingYears}</strong> ano{remainingYears === 1 ? '' : 's'},
        {' '}
        <strong>{remainingMonths}</strong> {remainingMonths === 1 ? 'mês' : 'meses'}, 
        {' '}
        <strong>{remainingDays}</strong> dia{remainingDays === 1 ? '' : 's'},
        <br />
        <strong>{remainingHours}</strong> hora{remainingHours === 1 ? '' : 's'},
        {' '}
        <strong>{remainingMinutes}</strong> minuto{remainingMinutes === 1 ? '' : 's'}
        {' e '}
        <strong>{remainingSeconds}</strong> segundo{remainingSeconds === 1 ? '' : 's'} na prisão.
      </p>
    );
  }

  render() {
    return (
      <Layout style={{margin: "auto"}}>
        <SEO title="Lula na Cadeia" keywords={[`gatsby`, `application`, `react`, `lula`]} />
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
                title="Quanto tempo de prisão resta ao molusco?"
                url="https://lulapreso.netlify.com"
              >
                <div style={{cursor: "pointer"}}>
                  <WhatsappIcon size={64} round={true} />
                </div>
              </WhatsappShareButton>
              <TwitterShareButton
                title="Quanto tempo de prisão resta ao molusco?"
                url="https://lulapreso.netlify.com"
                hashtags={["LulaTaPresoBabaca", "LulaLivre2043"]}
              >
                <div style={{cursor: "pointer"}}>
                  <TwitterIcon size={64} round={true} />
                </div>
              </TwitterShareButton>
              <EmailShareButton
                subject="Quanto tempo de prisão resta ao molusco?"
                url="https://lulapreso.netlify.com"
              >
                <div style={{cursor: "pointer"}}>
                  <EmailIcon size={64} round={true} />
                </div>
              </EmailShareButton>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

export default IndexPage
