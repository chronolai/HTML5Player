# HTML5Player

### Include

``` html
<link href="stylesheets/style.css" rel="stylesheet" type="text/css" />
<script src="javascripts/video-player.js"></script>
```

### Howto

``` javascript
<script>
  document.body.onload = function() {
    player = new VideoPlayer('#player', {
      width: '100%',
      height: '360px',
      title: 'Big Buck Bunny',
      url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/big_buck_bunny_1080p.mp4',
      cover: 'https://peach.blender.org/wp-content/uploads/bbb-splash.png'
    });
  };
</script>
```

### Hotkey

| Action      | Key             |
|-------------|-----------------|
| Play / Pause| <kbd>Space</kbd>|
| +10s        | <kbd>→</kbd>    |
| -10s        | <kbd>←</kbd>    |
| Volume up   | <kbd>↑</kbd>    |
| Volume down | <kbd>↓</kbd>    |

### Mouse

| Action      | Event       |
|-------------|-------------|
| Play / Pause| Click       |
| Fullscreen  | Double click|


### For developer

``` bash
$ compass watch
```