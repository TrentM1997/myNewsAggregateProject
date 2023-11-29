Read It is an API powered web app that suggests news articles and allows the user to search for articles themselves. 

PROJECT STATUS: INCOMPLETE | VERSION 1

Problem I identified --> I notice searching for current events in a typical search engine can 
bury any actual printed reporting about an event under a sea of video's of pundits giving a take, or content creators doing the same. Even social media posts are prioritized 
over actual reporting in some cases, where I'll see tweets about stories before anything else. 

Why I'm Making  Read It --> I would like to have an app to use that would allow me to solely search for printed articles, as a means to better inform myself about the world. 
I'd love to believe that I'm above the impressions that social media leaves imprinted in peoples minds, when you hear opinions about current events prior to ever getting the 
facts yourself. But I'm a person and I'm subject to my environment just as much as anybody else, so this will be a useful tool for myself to read and learn as opposed to letting 
social media regurgitations about a story paint my views on a topic. So what better way to be invested in making that change than to forge a tool to tackle the problem myself? 

TECH --> Languages: HTML5, CSS3 and JavaScript 
       ||  API: News API https://newsapi.org

Challenges --> Initially My biggest challenges were simply how I iterate through the the fetch results. Initially I only knew how to display the first results of a fetch request
by using innerHTML to display the [0] index of the data array that returns upon making the API call. I wasn't sure how to display a multitude of articles without having a page full of 
1000+ search results. And upon working through that problem and getting a solution I realized I hadn't yet thought about what the user will initially be looking at prior to looking for 
a topic, and realized i needed to have some suggestions about current events to read. Once I figured out how to load story suggestions upon the event listener "DOMContentLoaded" I focused on 
at least making the search bar more aesthetically pleaseing to look at and use. 

Future Features --> I want to implement an optional performance window that will display for the user different metrics about size of the data, endpoints, time for the request etc  

