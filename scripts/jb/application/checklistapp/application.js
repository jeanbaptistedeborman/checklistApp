/**
 * @author JB
 */

/*jslint vars:true, white:true, nomen:true, plusplus:true */
/*global SVGFactory,$*/

var Application = {
	question_num : 1000,
	display_$ : null,
	progressPointContainer_$ : null,

	QuestionManager : function() {"use strict";
		var context = this;

		this.onChoiceMade = function() {

			// Event placeholder;

		};
		this.display = function(question_$) {
			//trace(question_$.html());
			Application.display_$.append(question_$);
			var responses_$ = question_$.find(".response");
			//responses_$.hide ();
			responses_$.on("click", function() {
				trace("hello");
				var this_$ = $(this);
				var met_bool = this_$.attr("data-result") !== 'none';
				var currentProgressPoint_$ = $(".active");
				currentProgressPoint_$.toggleClass("active");
				if (met_bool) {
					currentProgressPoint_$.toggleClass("met");

				} else {

					currentProgressPoint_$.toggleClass("notMet");

				}

				context.onChoiceMade();

			});

		};

	},

	StepManager : function(application, step_$) {"use strict";

		var questions_$, question_$, responses_$, n;
		var displayQuestion = function(question_num) {
			
			$('body .question, body .response').remove (); 
			trace (question_num); 
			
			var question_$ = $(questions_$[question_num]);
			var questionManager = new Application.QuestionManager();
			$($(".progressPoint")[question_num]).toggleClass('active');
			questionManager.display(question_$);
			
			
			
			
			questionManager.onChoiceMade = function() {
				 

				displayQuestion(++application.question_num);
				//trace("onChoicemade");

			};

			//Application.progressPointContainer_$.

		};

		var init = function(step_$) {
			//var application =this;

			var name_$ = step_$.find(".name"), circle_params = new SVGFactory.Params();
			questions_$ = step_$.find(".questionSet");
			application.question_num = 0;

			for ( n = 0; n < questions_$.length; n++) {
				var progressPoint_$ = $("<span></span>");
				progressPoint_$.append(SVGFactory.getShape(circle_params));
				progressPoint_$.addClass("progressPoint");
				application.progressPointContainer_$.append(progressPoint_$);
			}
			application.display_$.prepend(name_$);

			displayQuestion(0);

		};

		init($(step_$));

	},

	init: function(display_$) {"use strict";
		this.display_$ = display_$;
		this.progressPointContainer_$ = $('<div id="progressPointContainer"></div>');

		this.display_$.append(this.progressPointContainer_$);
		var steps_$ = $('.step');
		$(".questionSet").each (function (index, element) {
			trace (index); 
			var question_$ = $(element).find ('.question');
			question_$.text (Number (1+ index) +". " + question_$.text ()); 
			
			
			
		}); 
		
		//$(".questionSet").hide (); 
			
			
		

		steps_$.detach();
	

		var stepManager = new this.StepManager(this, steps_$[0]);

	}
};

$(document).ready(function() {"use strict";
	Application.init($('body'));

});

