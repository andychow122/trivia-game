// variables


// functions
$("#start").on('click', function() {
	$("#start").remove();
	game.loadQ();
})

$(document).on('click', '.answer-button', function(e) {
	game.clicked(e);
})

$(document).on('click', '#reset', function() {
	game.reset();
})

// questions
var questions = [
{
	question: "Who is captain of the Straw Hat Pirates?",
	answers: ["Monkey D Luffy", "Roronoa Zoro", "Vinsmoke Sanji", "Usopp"],
	correctAnswer: "Monkey D Luffy",
	image: "assets/images/luffy.jpg"
},
{
	question: "What did Shanks give to Luffy when he was a child?",
	answers: ["a Sword", "a Straw Hat", "a shirt", "a compass"],
	correctAnswer: "a Straw Hat",
	image:"assets/images/strawhat.png"
},
{
	question: "What is the whale's name that is waiting for his crew?",
	answers: ["Rick", "Charles", "Harpoon", "Laboon"],
	correctAnswer: "Laboon",
	image:"assets/images/laboon.jpg"
},
{
	question: "What does Luffy say before his attacks?",
	answers: ["GUMMY GUMMY NO", "SHABU SHABU NO", "LOVE YOU LOVE YOU NO", "GOMU GOMU NO"],
	correctAnswer: "GOMU GOMU NO",
	image: "assets/images/gomuno.png"
},
{
	question: "Who is Luffy's grandfather?",
	answers: ["Sengoku", "Ace", "Garp", "Akainu"],
	correctAnswer: "Garp",
	image: "assets/images/garp.gif"
},
{
	question: "Which character is in love with Luffy?",
	answers: ["Boa Hancock", "Zoro", "Vivi", "Chopper"],
	correctAnswer: "Boa Hancock",
	image: "assets/images/boahancock.jpg"
},
{
	question: "Where is the restaurant Baratie located?",
	answers: ["North Blue", "East Blue", "South Blue", "West Blue"],
	correctAnswer: "East Blue",
	image: "assets/images/baratie.jpg"
},
{
	question: "Who is the Straw Hat cook?",
	answers: ["Sanji", "Chopper", "Frankie", "Teach"],
	correctAnswer: "Sanji",
	image: "assets/images/sanji.jpg"
},
{
	question: "How many swords does Zoro use?",
	answers: ["One", "Two", "Three", "Four"],
	correctAnswer: "Three",
	image: "assets/images/zoro.png"
},
{
	question: "Is One Piece the Best There Ever Was?",
	answers: ["Yes"],
	correctAnswer: "Yes",
	image: "assets/images/peace.jpg"
}];

// console.log(questions);

// play the game
var game = {

	correct: 0,
	incorrect: 0,
	question: questions,
	time: 20,
	currentQuestion: 0,
	countdown: function() {
		game.time--;
		$("#counter").html("Time left: " + game.time + " seconds");
		if (game.time <= 0) {
			console.log("TIME UP");
			game.timeUp();
		}
	},
	loadQ: function() {
		timer = setInterval(game.countdown,1000);
		$("#questions").html("<h2>"+questions[game.currentQuestion].question+"</h2>");
		for (var i = 0; i < questions[game.currentQuestion].answers.length; i++) {
			$("#questions").append('<button class="answer-button" id="button-'+i+'" data-name="'
				+questions[game.currentQuestion].answers[i]+'">'+questions[game.currentQuestion].answers[i]+'</button>');
		}

	},
	nextQ: function() {
		game.time = 20;
		$('#counter').html("Time: " + game.time + " seconds");
		game.currentQuestion++;
		game.loadQ();
	},
	timeUp: function() {
		clearInterval(timer);
		$("#questions").html("<h2>OUT OF TIME</h2>");
		$("#questions").append("<h3>The correct answer is:  " + questions[game.currentQuestion].correctAnswer + "</h3>" +"<br>"+"<img src='" 
			+ questions[game.currentQuestion].image + "'/>");
		if (game.currentQuestion==questions.length-1) {
			setTimeout(game.results,3*1000);
		}
		else {
			setTimeout(game.nextQ,3*1000);
		}
	},
	results: function() {
		clearInterval(timer);
		$("#questions").html("<h2>FINISHED!</h2>");
		$("#questions").append("Correct: " + game.correct + "<br>");
		$("#questions").append("Incorrect: " + game.incorrect + "<br>");
		$("#questions").append("Unanswered: " + (10 - game.correct - game.incorrect) + "<br>");
		$("#questions").append('<button type="button" class="btn-primary" id ="reset">Reset</button>');
	},
	clicked: function(e) {
		clearInterval(timer);
		if ($(e.target).data("name") == questions[game.currentQuestion].correctAnswer) {
			game.answeredCorrectly();
		}
		else {
			game.answeredIncorrectly();
		}
	},
	answeredCorrectly: function () {
		console.log("nice");
		clearInterval(timer);
		game.correct++;
		$("#questions").html("<h2>" + "YOU GOT IT RIGHT" + "</h2>" +"<br>"+"<img src='" 
			+ questions[game.currentQuestion].image + "'/>");
		if (game.currentQuestion==questions.length-1) {
			setTimeout(game.results,3*1000);
		}
		else {
			setTimeout(game.nextQ,3*1000);
		}
	},
	answeredIncorrectly: function () {
		console.log("wrong");
		clearInterval(timer);
		game.incorrect++;
		$("#questions").html("<h2>" + "YOU GOT IT WRONG" + "</h2>");
		$("#questions").append("<h3>The correct answer is:  " + questions[game.currentQuestion].correctAnswer + "</h3>"
		  +"<br>"+"<img src='" + questions[game.currentQuestion].image + "'/>");
		if (game.currentQuestion==questions.length-1) {
			setTimeout(game.results,3*1000);
		}
		else {
			setTimeout(game.nextQ,3*1000);
		}
	},
	reset: function () {
		game.currentQuestion = 0;
		game.correct = 0;
		game.incorrect = 0;
		game.time = 20;
		game.loadQ();

	}

};