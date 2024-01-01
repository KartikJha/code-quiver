import httpx
import re
import os

movies = ["predestination_2014"]
base_url = "https://yts.autos/movies/"

for movie in movies:
    movie_renamed = "-".join(movie.lower().split('_'))
    response = httpx.get(base_url+movie_renamed)
    if response.status_code == 200:
        m = re.search('href=\"magnet(.+?)announce\"', response.text)
        os.system("transmission-cli -w /media/kartikjha/Filesystem-2 '%s'" % "magnet"+m.group(1)+"announce")
    else:
        print("Movie %s not found" % movie_renamed)
    # print(m.group(1))
