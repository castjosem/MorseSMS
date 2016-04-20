<h1><p align="center"><a href="http://devpost.com/software/morsesms" target="_blank">MorseSMS</a></p></h1>

<p align="center">
  <a href="http://hackfsu16.devpost.com/"><b>HackFSU 2016</b></a>
</p>

<p align="center">
<br>
|
<b><a href="#inspiration"> Inspiration </a></b>|
<b><a href="#what-it-does"> What it does </a></b>|
<b><a href="#how-we-built-it"> How its built </a></b>

</p>

---

## Inspiration
We wanted to create a program that would incorporate the myo armband and also morse code. Our work will also helped those who are unable to send text messages, the ability to do so with simple gestures. 

## What it does
MorseSMS allows one to use hand gestures to type in morse code using the myo armband. During this process one is also given suggestions to improve the speed of the message typing. The user then has the ability to send the text as SMS. 

## How we built it
The program is written in Javascript, and is run on Node.js. We also implement the express framework and the Socket.IO library. To use the armband, we use the myo package found on npm. Lastly, we implement the Bing and Twilio APIs. 

## Challenges we ran into
Our biggest challenge was our lack of experience with Node.js and the frameworks we used. The Myo Armband can also be inconsistent with how it reads gestures, sometimes it is very sensitive and sometimes you have to make a lot of movement before it can read your input. 

## Accomplishments that we're proud of
We got most of our work done about 6 hours before submission. First hackathon that we did where we actually completed the hack. First hardware hack. 

## What we learned
We learned a great deal about Javascript in general but especially for Node.js and Socket.io. 

## What's next for MorseSMS
Better word suggesting, two armbands at once, death ray. 




## License

MIT License

Copyright (c) [year] [fullname]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
