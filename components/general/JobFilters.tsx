import { XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { countryList } from "@/app/utils/countriesList";

const jobTypes = ["full-time", "part-time", "contract", "internship"];

export function JobFilter() {
  return (
    <Card className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto bg-background shadow-sm dark:shadow-none dark:border dark:border-gray-700 h-fit">
      <CardHeader className="flex justify-between items-center flex-row p-4 sm:p-6 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-800 dark:to-indigo-800">
        <CardTitle className="text-xl sm:text-2xl font-semibold text-white dark:text-purple-100">
          Filters
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="bg-white/10 hover:bg-white/20 text-white dark:bg-purple-900/20 dark:hover:bg-purple-900/30 dark:text-purple-100 h-8"
        >
          <span>Clear All</span>
          <XIcon className="size-4 ml-2" />
        </Button>
      </CardHeader>
      <Separator className="bg-gray-200 dark:bg-gray-700" />
      <CardContent className="space-y-6 p-4 sm:p-6">
        {/* Job Types Section */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Job Types
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {jobTypes.map((job, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <Checkbox
                  id={job}
                  className="text-purple-600 dark:text-purple-400"
                />
                <Label
                  className="text-sm text-gray-700 dark:text-gray-300"
                  htmlFor={job}
                >
                  {job}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-gray-200 dark:bg-gray-700" />

        {/* Location Section */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Location
          </Label>
          <Select>
            <SelectTrigger className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border-none rounded-lg p-3 text-gray-700 dark:text-gray-300">
              <SelectValue placeholder="Select Location" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
              <SelectGroup>
                <SelectLabel className="text-gray-600 dark:text-gray-400 font-semibold">
                  Worldwide
                </SelectLabel>
                <SelectItem
                  value="worldwide"
                  className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                >
                  <span>🌍</span>
                  <span className="pl-2">Worldwide / Remote</span>
                </SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel className="text-gray-600 dark:text-gray-400 font-semibold">
                  Location
                </SelectLabel>
                {countryList.map((country) => (
                  <SelectItem
                    value={country.name}
                    key={country.name}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                  >
                    <span>{country.flagEmoji}</span>
                    <span className="pl-2">{country.name}</span>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
