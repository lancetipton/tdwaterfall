define(["jquery"], function(jquery) {
	TDWaterfall = function(){

		this.init = function(args, cb){
			this.return_cb = cb;
			this.opts = args;
			sortBreakpoints.call(this);
			setupItems.call(this, this.reSize)
			window.addEventListener('resize', this.reSize.bind(this), true);
		};

		this.setSize = function(){
			var fullWidth = getStyleNumber(this.container, "width");
			var fullHeight = getStyleNumber(this.container, "height");
			var rowPos = 0;
			var setTop = 0;
			var topSet = false;

			// Keep track of column heights:
			var colsHeights = [];
			for(var col = 0; col < this.opts["perRow"]; col++){
				colsHeights.push(0);
			}

			var itemSmaller = 0;
			if(this.opts["spaceLeft"]){
				itemSmaller = ((this.opts["perRow"] -1) * this.opts["spaceLeft"]) / this.opts["perRow"];
			}
			var childWidth = (fullWidth/this.opts["perRow"]) - itemSmaller;

			for(var i = 0; i < this.children.length; i++){
				//  If Top row is set, use it to set the rest of the elements
				if(topSet){
					// Find the element directly above it:
					var mesure = this.children[ i - this.opts["perRow"] ];
					// Get the pos of the  element based off the height of the above element, and how far down it is:
					setTop = getStyleNumber(mesure, "height") + getStyleNumber(mesure, "top");
					if(this.opts['spaceTop']){
						setTop += this.opts['spaceTop']
					}
				}
				// Set Child Pos:					
				if(this.opts["spaceLeft"] && rowPos !== 0){
					this.children[i].setAttribute("style",  "" 
						+ "position: absolute;" 
						+ "width:" +  childWidth + "px;"
						+ "top: " + setTop +"px;"
						+ "left:" + ((childWidth * rowPos) + (this.opts["spaceLeft"] * rowPos)) + "px;"
					);
				}
				else{
					this.children[i].setAttribute("style",  "" 
						+ "position: absolute;" 
						+ "width:" +  childWidth + "px;"
						+ "top: " + setTop +"px;"
						+ "left:" + (childWidth * rowPos) + "px;"
					);
				}
				// Add distance from the top for that col:
				//  Get current setTop pos, plus the height of the current element:
				colsHeights[rowPos] = setTop + getStyleNumber(this.children[i], "height");

				// Go to next item in the row
				rowPos ++;
				// If the rowPos == the amount per row, start a new row.
				if(rowPos === this.opts["perRow"]){
					rowPos = 0;
				}
				// Check it top row is over, to do logic for next rows
				if(i === this.opts["perRow"] -1){
					topSet = true;
				}
				// Get last elements pos and height to set the size of out container:
				if(i === this.children.length - 1){
					if(this.opts["containerBottomPad"]){
						fullHeight = findmax(colsHeights) + this.opts["containerBottomPad"];
					}
					else{
						fullHeight = findmax(colsHeights);
					}
				}
			}

			this.container.setAttribute("style",  "" 
				+ "width: 100% !important;" 
				+ "height:" +  fullHeight + "px;" 
				+ "position: relative;"
			);

	        if (typeof this.return_cb === "function") {
	            return this.return_cb.call(this, true);
	        }
		};

		this.reSize = function(){
			var currentWidth = window.innerWidth
			var is_set = false;
			if(this.opts["breakPoints"]){
				for(var i = 0; i < this.opts["breakPoints"].length; i++){
					if(this.opts["breakPoints"][i]["point"] >= currentWidth){
						this.activeBreakPoint  = this.opts["breakPoints"][i]
						setBreakPointSetting.call(this);
						this.setSize.call(this);
						is_set = true;
						return;
					}
				}
			}
			
			if(!is_set){
				if(this.opts["breakPoints"] !== undefined){
					this.activeBreakPoint  = this.opts["breakPoints"][ this.opts["breakPoints"].length - 1];
					setBreakPointSetting.call(this);
				}
				this.setSize.call(this);
				is_set = true;
			}
		};

		function setStartSettings(args){
			var data = {point: 0, settings: {}};
			for(arg in args){
				if(args.hasOwnProperty(arg)){
					var value;
					var option;
					if(arg === "perRow" || arg === "spaceTop" || arg === "spaceLeft"){
						value = args[arg];
						option = arg
					}
					if(value !== undefined){
						data["settings"][option] = value; 
					}
				}
			}
			if(this.opts["breakPoints"] !== undefined){
				if(this.opts["breakPoints"].constructor !== Array){
					throw "TD Error: Breakpoint options must be of type array."
				}
				this.opts["breakPoints"].push(data);
			}
		};

		function sortBreakpoints(){
			if(this.opts["breakPoints"]){
				this.opts["breakPoints"].sort(function(a, b) {
				    return a.point - b.point;
				});
			}
			setStartSettings.call(this, this.opts)
		};

		function setBreakPointSetting(){
			if(this.activeBreakPoint){
				if(this.activeBreakPoint["settings"]["perRow"]){
					this.opts["perRow"] = this.activeBreakPoint["settings"]["perRow"];
				}
				if(this.activeBreakPoint["settings"]["perRow"] > 1 && this.activeBreakPoint["settings"]["spaceLeft"]){
					this.opts["spaceLeft"] = this.activeBreakPoint["settings"]["spaceLeft"];
				}
				if(this.activeBreakPoint["settings"]["spaceTop"]){
					this.opts["spaceTop"] = this.activeBreakPoint["settings"]["spaceTop"];
				}
				if(this.activeBreakPoint["settings"]["containerBottomPad"]){
					this.opts["containerBottomPad"] = this.activeBreakPoint["settings"]["containerBottomPad"];
				}
			}
		};

		function getStyleNumber(element, style){
			return parseInt(window.getComputedStyle(element,null).getPropertyValue(style));
		};

		function findmax(array){
			var max = 0;
			var a = array.length;
			var counter;
			for (counter=0;counter<a;counter++){
				if (array[counter] > max){
					max = array[counter]
				}
			}
			return max
		};

		function setupItems(cb){
			this.container = document.getElementById(this.opts["containerId"]);
			if(this.container === null){
				throw "Error: Please pass a containerId as an argument and ensure it's on the page";
			}
			this.children = this.container.children;
			if(typeof cb == "function"){
				cb.call(this, this);
			}
		};
	}
	return TDWaterfall;
});
