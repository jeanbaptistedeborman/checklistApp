/**
 * @author JB
 */

/*jslint vars:true, white:true, nomen:true, plusplus:true */
/*global SVGFactory,$*/

var Application = {
	display_$ : null,

	QuestionManager : function() {"use strict";
		var display = function() {
		};

	},

	StepManager : function(step_$) {"use strict";

		var questions_$;

		var init = function(step_$) {

			var name_$ = step_$.find(".name"), circle_params = new SVGFactory.Params();
			Application.display_$.append(name_$);
			questions_$ = step_$.find(".question");

			for (var n = 0; n < questions_$.length; n++) {
				var progressPoint_$ = SVGFactory.getShape(circle_params);
				progressPoint_$.addClass("progressPoint");
				/* How to find parent object Application without direct reference ? */
				Application.display_$.append(progressPoint_$);
			}

			displayQuestion(0);

		};
		var displayQuestion = function() {

		}
		init($(step_$));

	},

	start : function(display_$) {"use strict";
		this.display_$ = display_$;
		var steps_$ = $('.step');

		steps_$.detach();

		var stepManager = new this.StepManager(steps_$[0]);

	}
};

$(document).ready(function() {"use strict";
	Application.start($('body'));

});

