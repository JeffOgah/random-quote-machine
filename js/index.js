$.ajaxSetup({
  async: false });


let getQuotes, tweetQuote;
const colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];

$.getJSON(
"https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json",
function (result) {
  getQuotes = result.quotes;
});


function newQuote() {return Math.floor(Math.random() * getQuotes.length);}

class Presentation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: getQuotes[newQuote()].quote,
      author: getQuotes[newQuote()].author };

    this.randomQuote = this.randomQuote.bind(this);
    this.handleTweet = this.handleTweet.bind(this);
  }

  //Function to get random quote
  randomQuote() {
    this.setState({
      quote: getQuotes[newQuote()].quote,
      author: getQuotes[newQuote()].author });

  }

  //A function to check tweet length
  handleTweet() {
    let temp = "https://twitter.com/intent/tweet?&text=".concat(this.state.quote + " " + this.state.author + ". https://codepen.io/jeffogah/full/RdJqew");

    if (temp.length > 280) {
      tweetQuote = "https://twitter.com/intent/tweet?&text=".concat("View quotes at: https://codepen.io/jeffogah/full/RdJqew");
    } else
    {
      tweetQuote = temp;
    }
  }

  render() {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const textStyle = {
      color: randomColor,
      backgroundColor: "white" };

    const backgroundStyle = {
      backgroundColor: randomColor,
      color: "white" };

    {this.handleTweet();}
    return (
      React.createElement("div", { id: "container", style: backgroundStyle },
      React.createElement("div", { id: "quote-box", style: textStyle },
      React.createElement("div", { id: "text" }, React.createElement("p", null, "\"", this.state.quote, "\"")),
      React.createElement("div", { id: "author" }, React.createElement("p", null, React.createElement("em", null, this.state.author))),
      React.createElement("div", { id: "quote-box-footer" },
      React.createElement("button", { id: "new-quote", onClick: this.randomQuote, style: backgroundStyle }, "New quote"),


      React.createElement("a", { href: tweetQuote, target: "_blank", id: "tweet-quote", style: textStyle },
      React.createElement("i", { class: "fab fa-twitter-square" })))),



      React.createElement("p", null, React.createElement("i", { class: "fa fa-fire" }), " by Jeff")));


  }}


ReactDOM.render(React.createElement(Presentation, null), document.getElementById("page-wrapper"));