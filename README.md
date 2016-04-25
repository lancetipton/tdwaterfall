# TD Waterfall library:

### About

I have been creating a number of simple and pure JavaScript plugins. They are a work in-progress as is this readme. They will be updated periodically as I make changes to them, and optimize them. As of now they are nothing facy, but they get the job done. They are straight and to the point, and because of that they are pretty lightweight. Please feel free to use them all you want. Branch them, make changes, whatever you feel like doing.

I know there are plenty of great plugins out there that already to the same things. I have used them often, and they make life as a programmer better. The point is not to write a better or plugin, but more to go through process of building a library to understand how it’s done and what is requires. It is a great learning experience, and I encourage anyone who has never done it, to do so. 

### How to Use:
```
			wf = new TTDWaterfall();
			wf.init({
				containerId: "postsWrapper",
				spaceTop: 20,
				spaceLeft: 0,
				perRow: 3,
				containerBottomPad: 40,
				breakPoints: [
					{
						point: 640,
						settings: {
							perRow: 1,
						}
					},
					{
						point: 1020,
						settings: {
							perRow: 2,
						}
					}
				]
			}, function(loaded){
        if(loaded){
          console.log("waterfall has been loaded!");
        }
			})
```

### Will add more info soon
