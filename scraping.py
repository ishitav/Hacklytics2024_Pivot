
import requests


def getWhatWhereWhenImpacts(fullDescription):
    print("\nfullDescription in GET function: " + fullDescription)
    # separate full description into parts with text
    # example description:
    # ...WINTER WEATHER ADVISORY IN EFFECT UNTIL NOON AKST SUNDAY...
    # * WHAT...Snow and blowing snow. Additional snow accumulations of
    # up to one inch. Winds gusting as high as 45 mph reducing
    # visibility to 1/2 mile or less.
    # * WHERE...Western Arctic Coast. Worst conditions around Point Lay.
    # * WHEN...Until noon AKST Sunday.
    # * IMPACTS...Areas of blowing snow could significantly reduce
    # visibility. The cold wind chills as low as 30 below zero could
    # cause frostbite on exposed skin in as little as 30 minutes.

    print("__________\n")

    print(fullDescription.split("* WHAT...")[0])

    # get what will happen (everything after first * WHAT... until next *)
    whatWillHappen = fullDescription.split("* WHAT...")[1].split("* WHERE...")[0]

    # get where (everything after first * WHERE... until next *)
    where = fullDescription.split("* WHERE...")[1].split("* WHEN...")[0]

    # get when (everything after first * WHEN... until next *)
    when = fullDescription.split("* WHEN...")[1].split("* IMPACTS...")[0]

    # get impacts (everything after first * IMPACTS... until end)
    impacts = fullDescription.split("* IMPACTS...")[1]

    return [whatWillHappen, where, when, impacts]


class WeatherEvent:
    def __init__(self, title, effective, expires, urgency, severity, certainty, areasAffected, link, fullDescription):
        self.title = title
        self.effective = effective
        self.expires = expires
        self.urgency = urgency
        self.severity = severity
        self.certainty = certainty
        self.areasAffected = areasAffected
        self.link = link
        # self.whatWhereWhenImpacts = getWhatWhereWhenImpacts(fullDescription)
        self.fullDescription = fullDescription

    def __str__(self):
        return "Title: " + self.title + "\nEffective: " + self.effective + "\nExpires: " + self.expires  + "\nUrgency: " + self.urgency + "\nSeverity: " + self.severity + "\nCertainty: " + self.certainty + "\nAreas affected: " + str(self.areasAffected) + "\nLink: " + self.link + "\nFull Description: " + self.fullDescription + "\n" ## "\nWhat, Where, When, Impacts: " + str(self.whatWhereWhenImpacts)


# def main():
#     url = "https://alerts.weather.gov/cap/us.php?x=1"
#
#     # Get the HTML of the page
#     page = requests.get(url)
#
#     # get list of table entries
#     table = page.text.split("<entry>")
#     table = table[1:]
#     print(table[1])
#
#     #get attributes of each entry
#     title = table[0].split("<title>")[1].split("</title>")[0]
#     effective = table[0].split("<cap:effective>")[1].split("</cap:effective>")[0]
#     # convert effective to datetime
#     effective = effective.split("T")[0] + " " + effective.split("T")[1].split("-")[0]
#
#     expires = table[0].split("<cap:expires>")[1].split("</cap:expires>")[0]
#     # convert expires to datetime
#     expires = expires.split("T")[0] + " " + expires.split("T")[1].split("-")[0]
#
#     summary = table[0].split("<summary>")[1].split("</summary>")[0]
#     urgency = table[0].split("<cap:urgency>")[1].split("</cap:urgency>")[0]
#     severity = table[0].split("<cap:severity>")[1].split("</cap:severity>")[0]
#     certainty = table[0].split("<cap:certainty>")[1].split("</cap:certainty>")[0]
#     areasAffected = table[0].split("<cap:areaDesc>")[1].split("</cap:areaDesc>")[0]
#     link = table[0].split("<link href=\"")[1].split("\"")[0]
#
#     # enter link and get full description
#     descriptionPage = requests.get(link)
#     fullDescription = descriptionPage.text.split("<description>")[1].split("</description>")[0]
#     print("fullDescription: " + fullDescription)
#
#     # separate full description into parts with text
#     # example description:
#     # ...WINTER WEATHER ADVISORY IN EFFECT UNTIL NOON AKST SUNDAY...
#     # * WHAT...Snow and blowing snow. Additional snow accumulations of
#     # up to one inch. Winds gusting as high as 45 mph reducing
#     # visibility to 1/2 mile or less.
#     # * WHERE...Western Arctic Coast. Worst conditions around Point Lay.
#     # * WHEN...Until noon AKST Sunday.
#     # * IMPACTS...Areas of blowing snow could significantly reduce
#     # visibility. The cold wind chills as low as 30 below zero could
#     # cause frostbite on exposed skin in as little as 30 minutes.
#
#     # get what will happen (everything after first * WHAT... until next *)
#     whatWillHappen = fullDescription.split("* WHAT...")[1].split("* WHERE...")[0]
#     # print("whatWillHappen: " + whatWillHappen)
#
#     # get where (everything after first * WHERE... until next *)
#     where = fullDescription.split("* WHERE...")[1].split("* WHEN...")[0]
#
#     # get when (everything after first * WHEN... until next *)
#     when = fullDescription.split("* WHEN...")[1].split("* IMPACTS...")[0]
#
#     # get impacts (everything after first * IMPACTS... until end)
#     impacts = fullDescription.split("* IMPACTS...")[1]
#
#     whatwherewhenimpacts = [whatWillHappen, where, when, impacts]
#
#
#     # # get instructions will label instructions
#     # instructions = fullDescription.split("<p>")[1].split("</p>")[0]
#     # print("instructions: " + instructions)
#
#     print("link: " + link)
#     print("Title: " + title)
#     print("Effective: " + effective)
#     print("Expires: " + expires)
#     print("Summary: " + summary)
#     print("Urgency: " + urgency)
#     print("Severity: " + severity)
#     print("Certainty: " + certainty)
#     print("Areas affected: " + areasAffected)
#
#     # create WeatherEvent object
#     weatherEvent = WeatherEvent(title, effective, expires, summary, urgency, severity, certainty, areasAffected, link, fullDescription)
#
#     print("Weather Event: ")
#     print(weatherEvent)

def fillWeatherEvents():
    url = "https://alerts.weather.gov/cap/us.php?x=1"

    weatherEvents = []

    # get list of table entries and loop through to create a list of WeatherEvent objects
    page = requests.get(url)
    table = page.text.split("<entry>")
    table = table[1:]
    # loop through table to create WeatherEvent objects but stop at 5 for now
    for entry in table:
        if len(weatherEvents) == 5:
            break
        title = entry.split("<title>")[1].split("</title>")[0]

        effective = entry.split("<cap:effective>")[1].split("</cap:effective>")[0]
        effective = effective.split("T")[0] + " " + effective.split("T")[1].split("-")[0]

        expires = entry.split("<cap:expires>")[1].split("</cap:expires>")[0]
        expires = expires.split("T")[0] + " " + expires.split("T")[1].split("-")[0]

        urgency = entry.split("<cap:urgency>")[1].split("</cap:urgency>")[0]
        severity = entry.split("<cap:severity>")[1].split("</cap:severity>")[0]
        certainty = entry.split("<cap:certainty>")[1].split("</cap:certainty>")[0]
        areasAffected = list((entry.split("<cap:areaDesc>")[1].split("</cap:areaDesc>")[0]).split(";"))
        areasAffected = [area.strip() for area in areasAffected]
        link = entry.split("<link href=\"")[1].split("\"")[0]

        descriptionPage = requests.get(link)
        fullDescription = descriptionPage.text.split("<description>")[1].split("</description>")[0]
        # print("fullDescription1: " + fullDescription)
        weatherEvent = WeatherEvent(title, effective, expires, urgency, severity, certainty, areasAffected,
                                    link, fullDescription)
        weatherEvents.append(weatherEvent)
    print("First 5 weather events")
    print(weatherEvents[:5])
    print("-----------------------------------")
    return weatherEvents
    # for event in weatherEvents:
    #     print(event)
    #     print("\n\n")

def getImmediateWeatherEvents(weatherEvents):
    immediateEvents = []
    for event in weatherEvents:
        if event.urgency == "Immediate":
            immediateEvents.append(event)
    return immediateEvents

def getSevereWeatherEvents(weatherEvents):
    severeEvents = []
    for event in weatherEvents:
        if event.severity == "Severe":
            severeEvents.append(event)
    return severeEvents

def getUniqueAreasAffected(weatherEvents):
    uniqueAreas = []
    for event in weatherEvents:
        if event.areasAffected not in uniqueAreas:
            uniqueAreas.append(event.areasAffected)
    return uniqueAreas

def getUniqueSeverities(weatherEvents):
    uniqueSeverities = []
    for event in weatherEvents:
        if event.severity not in uniqueSeverities:
            uniqueSeverities.append(event.severity)
    return uniqueSeverities

def getUniqueUrgencies(weatherEvents):
    uniqueUrgencies = []
    for event in weatherEvents:
        if event.urgency not in uniqueUrgencies:
            uniqueUrgencies.append(event.urgency)
    return uniqueUrgencies

def createAreaZoneDict(weatherEvents):
    areaZoneDict = {}
    for event in weatherEvents:
        if event.areasAffected not in areaZoneDict:
            areaZoneDict[event.areasAffected] = []
        areaZoneDict[event.areasAffected].append(event)
    return areaZoneDict

def getWeatherEventsByArea(areaZoneDict, area):
    return areaZoneDict[area]

def createZoneReferenceDict():
    # open data.csv
    file = open("data.csv", "r")

    # create dictionary with key as name and lat/long as value
    zoneReferenceDict = {}
    # skip header
    file.readline()
    for line in file:
        line = line.split(",")
        zoneReferenceDict[line[3]] = [line[7], line[8].strip()]

    return zoneReferenceDict

def main():
    weatherEvents = fillWeatherEvents()
    print(weatherEvents[0])
    # print(getImmediateWeatherEvents(weatherEvents))
    # print(getUniqueSeverities(weatherEvents))
    # print(getUniqueUrgencies(weatherEvents))

    zoneReference = createZoneReferenceDict()
    print(zoneReference)

if __name__ == "__main__":
    main()