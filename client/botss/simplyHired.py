import requests
import certifi
from pymongo import MongoClient
from bs4 import BeautifulSoup
import requests
from random import choice
import json

def proxy_generator():
    response = requests.get("https://sslproxies.org/")
    soup = BeautifulSoup(response.content, 'html5lib')
    proxies = choice(list(map(lambda x:x[0]+':'+x[1], list(zip(map(lambda x:x.text, soup.findAll('td')[::8]), map(lambda x:x.text, soup.findAll('td')[1::8]))))))
    proxy = {"http": "http://{}".format(proxies)}
    return proxy

def extract(job, page):

    #job = "ecommerace, google ads media buyer"
    Location = "remote"

    try:
        proxy = proxy_generator()
        print(proxy)
        #headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36'}
        url = f'https://www.simplyhired.com/search?q={job}&l={Location}&pn={page}'
        
        r = requests.get(url, proxies=proxy, timeout=7)
        soup = BeautifulSoup(r.content, 'html.parser')
        return soup

    except:
        print("connection error")
        pass

def extract_sum(link):
    try:
        proxy = proxy_generator()
       
        #headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36'}
        url = f'https://www.simplyhired.com{link}'
        
        r = requests.get(url, proxies=proxy, timeout=7)
        job_data = r.text
        soup = BeautifulSoup(job_data, 'html.parser')
        return soup

    except:
        print("connection error")
        pass


def find_sum(link):
    c = extract_sum(link)
    try:
        job = c.find('div', class_ = "viewjob-jobDescription")
        parsed_job = job.find('div', class_ = "p").get_text(strip=True, separator="\n")
    except:
        return "no job description available"
    return parsed_job


def transform(soup, job_type):

    divs = soup.find_all('div', class_ = "SerpJob-jobCard")

    # iterate through the div 
    for item in divs:
        
        for link in item.find_all('a'):
            try:
                job_href = link.get('href')
            except:
                continue
            
        
        title = item.find('a').text.strip()

        # find company name via the span element and class name
        company = item.find('span', class_ = 'jobposting-company').text.strip()
    
        # attempt to find salary 
        try:
            salary = item.find('div', class_ = "jobposting-salary").text.strip()
          
        except: 
            salary = ''
       
        # job description
        summary = find_sum(job_href)
     
        
        #summary = item.find('p', class_ = 'jobposting-snippet').text.strip()
        
        jobs = {'title': title, 'company': company, 'salary': salary, 'summary': summary, 'job type': job_type}
        #print(jobs)
        
        # Append to the data sheet
        mycol.insert_one(jobs)

if __name__ == "__main__":
    # takes the first 3 pages

    client = MongoClient('mongodb+srv://LighthouseJobs:Parrlumberboys503@cluster0.7ec5s.mongodb.net/Usagidb?retryWrites=true&w=majority', tlsCAFile=certifi.where())
    try:
        print('connected bois')
    except Exception:
        print("unable to connect")
    

    mydb = client["mydatabase"]
    mycol = mydb["jobs"]

    f = open('./JobTypes.json', 'r')
    data = json.load(f)
    for i in data["job types"]:
         job_type = "ecommerce, " + i
         print(job_type)
         c = extract(job_type, 0)
         transform(c, i)
         break

        #for j in range(1, 2, 1):
           # c = extract(i, j)
            #transform(c)
   # x = mycol.delete_many({})
    #print(x.deleted_count, "docs deleted")
    
    
  