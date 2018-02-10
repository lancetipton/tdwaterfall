# TD Waterfall library:

### About
A simple plugin to display images in a waterfall format.

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
	}, 
	function(loaded){
	        if(loaded){
	        	console.log("waterfall has been loaded!");
	        }
})

```


