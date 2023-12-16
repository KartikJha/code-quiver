import httpx
import re
import os

movies = ["28_hotel_rooms_2012"]
base_url = "https://yts.autos/movies/"

for movie in movies:
    movie_renamed = "-".join(movie.split('_'))
    response = httpx.get(base_url+movie_renamed)
    m = re.search('href=\"magnet(.+?)announce\"', response.text)
    os.system("transmission-cli -w /media/kartikjha/Filesystem-2 '%s'" % "magnet"+m.group(1)+"announce")

    # print(m.group(1))
