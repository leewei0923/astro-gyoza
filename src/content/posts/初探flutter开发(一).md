---
title: 初探flutter开发i18n，多主题适配，响应式
date: 2024-06-12T14:32:21.865Z
tags: [flutter]
comments: true
draft: false
---

最近开发一个应用，遇到一下三个难题，这三个都是很基础的需求，但目前是我最大的拦路虎。

## 国际化

这里是通过安装插件实现的国际化方案：

```
 Android Studio -> File -> Setting -> Plugins -> 搜索Flutter Intl

 Flutter Intl
 1.18.4-2022.2
 2024.06.13
```

安装依赖

注：一开始添加依赖的时候，没有这样设置，会导致报错

```yaml
dev_dependencies:
 ...
  flutter_localizations:
    sdk: flutter
```

```bash
flutter pub get
```

初始化项目

```
Tool->Flutter Intl ->Initalize for the project：
```

成功后需要在`pubspec.yaml`后添加

```yaml
flutter:
  ...
  generate: true
  ...

# 放在最后
flutter_intl:
  enabled: true
```

![图片示意图](https://qi.7miaoyu.com/myblog/blog/2024/06/13/091514.png)

- generated包下的intl目录默认生成 **messages_all.dart** 和 **messages_en.dart** 文件，自动生成前缀是messages的文件。

还需要再arb文件中添加如下的内容

```
{
  "@@locale": "zh", // 这是需要添加，en文件中也类似
  "title": "你好，世界",
  "message": "这是一条本地化信息。",
  "setting": "设置"
}
```

如果需要添加新的语言语言包

```
Tool->Flutter Intl -> Add Locale：
```

MaterialApp 配置如下：

```dart
import 'package:flutter_localizations/flutter_localizations.dart';
import './generated/l10n.dart';

MaterialApp(
      ...
      localizationsDelegates: [
        S.delegate,
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      supportedLocales: S.delegate.supportedLocales,
      ...
    )
```

最后使用：

```dart
class LocalizationDemo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text('${S.of(context).title}'),
      ),
    );
  }
}
```

## 多主题

## 响应式

可以采用第三包的方案，例如：`responsive_builder`根据页面的大小，展示相应适配后的组件。该app可能会涉及到手机，平板，电脑。三种设备的宽度、高度，差异巨大，不一定会一个组件贯彻到底，所以采用该第三方库比较适合。

也可以使用原生方案，对于基础的页面，只需要根据页面的宽度来适配。

方法如下:

**MediaQuery**

```dart
import 'package:flutter/material.dart';

var screenWidth = MediaQuery.of(context).size.width; // 获取当前设备页面宽度
var screenHeight = MediaQuery.of(context).size.height; // 获取当前设备的长度
```

**LayoutBuilder**

`LayoutBuilder` 可以根据父组件的约束条件来构建不同的布局。

```dart
import 'package:flutter/material.dart';

class ResponsiveLayoutBuilderWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Responsive Layout Builder Widget'),
      ),
      body: LayoutBuilder(
        builder: (context, constraints) {
          if (constraints.maxWidth < 600) {
            return Center(child: Text('Small Screen'));
          } else {
            return Center(child: Text('Large Screen'));
          }
        },
      ),
    );
  }
}
```

**Flex 和 Expanded**

通过使用 `Flex` 和 `Expanded` 小部件，可以创建自适应的布局，确保子组件在不同尺寸的屏幕上都能合理分布。

```dart
import 'package:flutter/material.dart';

class FlexResponsiveWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Flex Responsive Widget'),
      ),
      body: Column(
        children: <Widget>[
          Expanded(
            flex: 1,
            child: Container(color: Colors.red),
          ),
          Expanded(
            flex: 2,
            child: Container(color: Colors.green),
          ),
          Expanded(
            flex: 1,
            child: Container(color: Colors.blue),
          ),
        ],
      ),
    );
  }
}
```

**FittedBox 和 AspectRatio**

`FittedBox` 可以根据父组件的大小来调整子组件的尺寸和位置，而 `AspectRatio` 则可以用来保持宽高比。

```dart
import 'package:flutter/material.dart';

class AspectRatioResponsiveWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Aspect Ratio Responsive Widget'),
      ),
      body: Center(
        child: AspectRatio(
          aspectRatio: 16 / 9,
          child: Container(
            color: Colors.blue,
            child: FittedBox(
              fit: BoxFit.contain,
              child: Text('Aspect Ratio 16:9'),
            ),
          ),
        ),
      ),
    );
  }
}
```
