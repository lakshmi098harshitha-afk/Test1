from typing import List, Dict, Any, Optional
import random


class AIStylistService:
    """
    AI Stylist Service for generating outfit recommendations.
    Currently uses a rule-based approach with placeholders for AI integration.
    """

    # Sample data for recommendations
    OUTFIT_TEMPLATES = {
        "Work": {
            "Male": {
                "Business Formal": [
                    {
                        "top": "White Oxford Shirt",
                        "bottom": "Grey Slim Fit Pants",
                        "shoes": "Black Leather Shoes",
                        "accessory": "Leather Belt",
                    },
                    {
                        "top": "Light Blue Oxford Shirt",
                        "bottom": "Navy Chinos",
                        "shoes": "Brown Leather Shoes",
                        "accessory": "Silk Tie",
                    },
                ],
                "Business Casual": [
                    {
                        "top": "Patterned Shirt",
                        "bottom": "Khaki Chinos",
                        "shoes": "Loafers",
                        "accessory": "Leather Belt",
                    },
                    {
                        "top": "Sweater",
                        "bottom": "Dark Jeans",
                        "shoes": "Chelsea Boots",
                        "accessory": "Leather Belt",
                    },
                ],
            },
            "Female": {
                "Professional Chic": [
                    {
                        "top": "Blouse",
                        "bottom": "Pencil Skirt",
                        "shoes": "Heels",
                        "accessory": "Purse",
                    },
                    {
                        "top": "Button-Down Shirt",
                        "bottom": "Trousers",
                        "shoes": "Pumps",
                        "accessory": "Scarf",
                    },
                ],
                "Smart Casual": [
                    {
                        "top": "Sweater",
                        "bottom": "Capri Pants",
                        "shoes": "Flats",
                        "accessory": "Jewelry",
                    },
                ],
            },
        },
        "Casual": {
            "Male": {
                "Modern": [
                    {
                        "top": "T-Shirt",
                        "bottom": "Jeans",
                        "shoes": "Sneakers",
                        "accessory": "Watch",
                    },
                    {
                        "top": "Hoodie",
                        "bottom": "Joggers",
                        "shoes": "Running Shoes",
                        "accessory": "Cap",
                    },
                ],
                "Classic": [
                    {
                        "top": "Polo Shirt",
                        "bottom": "Chinos",
                        "shoes": "Boat Shoes",
                        "accessory": "Leather Belt",
                    },
                ],
            },
            "Female": {
                "Chic": [
                    {
                        "top": "T-Shirt",
                        "bottom": "Shorts",
                        "shoes": "Sandals",
                        "accessory": "Sunglasses",
                    },
                    {
                        "top": "Blouse",
                        "bottom": "Skirt",
                        "shoes": "Flats",
                        "accessory": "Necklace",
                    },
                ],
                "Trendy": [
                    {
                        "top": "Crop Top",
                        "bottom": "High Waisted Jeans",
                        "shoes": "Sneakers",
                        "accessory": "Backpack",
                    },
                ],
            },
        },
        "Formal": {
            "Male": {
                "Tuxedo": [
                    {
                        "top": "Tuxedo Shirt",
                        "bottom": "Black Tuxedo Pants",
                        "shoes": "Oxfords",
                        "accessory": "Bow Tie",
                    },
                ],
                "Formal": [
                    {
                        "top": "Dress Shirt",
                        "bottom": "Dress Pants",
                        "shoes": "Dress Shoes",
                        "accessory": "Tie",
                    },
                ],
            },
            "Female": {
                "Evening Gown": [
                    {
                        "top": None,
                        "bottom": "Evening Gown",
                        "shoes": "Heels",
                        "accessory": "Clutch",
                    },
                ],
                "Cocktail": [
                    {
                        "top": None,
                        "bottom": "Cocktail Dress",
                        "shoes": "Heels",
                        "accessory": "Jewelry",
                    },
                ],
            },
        },
        "Party": {
            "Male": {
                "Club": [
                    {
                        "top": "Printed Shirt",
                        "bottom": "Dark Jeans",
                        "shoes": "Boots",
                        "accessory": "Watch",
                    },
                ],
            },
            "Female": {
                "Club": [
                    {
                        "top": "Sequined Top",
                        "bottom": "Short Skirt",
                        "shoes": "Heels",
                        "accessory": "Necklace",
                    },
                ],
                "Gala": [
                    {
                        "top": None,
                        "bottom": "Evening Gown",
                        "shoes": "Heels",
                        "accessory": "Clutch",
                    },
                ],
            },
        },
        "Evening": {
            "Male": {
                "Dinner": [
                    {
                        "top": "Dress Shirt",
                        "bottom": "Chinos",
                        "shoes": "Loafers",
                        "accessory": "Watch",
                    },
                ],
            },
            "Female": {
                "Dinner": [
                    {
                        "top": None,
                        "bottom": "Cocktail Dress",
                        "shoes": "Heels",
                        "accessory": "Jewelry",
                    },
                ],
            },
        },
        "Summer": {
            "Male": {
                "Beach": [
                    {
                        "top": "Tank Top",
                        "bottom": "Swim Trunks",
                        "shoes": "Flip Flops",
                        "accessory": "Sunglasses",
                    },
                ],
            },
            "Female": {
                "Beach": [
                    {
                        "top": "Bikini Top",
                        "bottom": "Bikini Bottom",
                        "shoes": "Flip Flops",
                        "accessory": "Hat",
                    },
                ],
            },
        },
        "Winter": {
            "Male": {
                "Cold Weather": [
                    {
                        "top": "Sweater",
                        "bottom": "Jeans",
                        "shoes": "Boots",
                        "accessory": "Scarf",
                    },
                ],
            },
            "Female": {
                "Cold Weather": [
                    {
                        "top": "Sweater",
                        "bottom": "Thermal Leggings",
                        "shoes": "Boots",
                        "accessory": "Scarf",
                    },
                ],
            },
        },
    }

    def __init__(self):
        self.templates = self.OUTFIT_TEMPLATES

    def generate_recommendation(
        self, occasion: str, gender: str, style: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Generate outfit recommendation based on occasion, gender, and style.

        Args:
            occasion: The occasion for the outfit (Work, Casual, Formal, Party, etc.)
            gender: User's gender (Male, Female)
            style: Preferred style (optional, defaults to first available)

        Returns:
            Dictionary containing outfit recommendation
        """
        if occasion not in self.templates:
            occasion = "Casual"

        occasion_data = self.templates[occasion]

        if gender not in occasion_data:
            gender = "Male" if gender == "Male" else "Female"
            if gender not in occasion_data:
                gender = "Male"

        gender_data = occasion_data[gender]

        if not style or style not in gender_data:
            styles = list(gender_data.keys())
            style = styles[0] if styles else None

        if style and style in gender_data:
            templates = gender_data[style]
            if templates:
                template = random.choice(templates)
                return self._build_outfit(template, occasion, gender, style)

        # Fallback to first available template
        for gender_styles in gender_data.values():
            if gender_styles:
                template = random.choice(gender_styles)
                return self._build_outfit(template, occasion, gender, style or "Casual")

        return self._create_default_outfit(occasion, gender)

    def _build_outfit(
        self, template: Dict[str, str], occasion: str, gender: str, style: str
    ) -> Dict[str, Any]:
        """Build a complete outfit from template."""
        return {
            "occasion": occasion,
            "gender": gender,
            "style": style,
            "top": template.get("top"),
            "bottom": template.get("bottom"),
            "shoes": template.get("shoes"),
            "accessory": template.get("accessory"),
            "recommendation_id": f"REC-{occasion[:3].upper()}-{style[:3].upper()}-{gender[:1].upper()}-{id(template)}",
            "image_url": f"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
            "confidence_score": random.uniform(0.75, 0.95),
        }

    def _create_default_outfit(self, occasion: str, gender: str) -> Dict[str, Any]:
        """Create a default outfit when no specific template matches."""
        return {
            "occasion": occasion,
            "gender": gender,
            "style": "Casual",
            "top": "T-Shirt",
            "bottom": "Jeans",
            "shoes": "Sneakers",
            "accessory": "Watch",
            "recommendation_id": f"REC-DEF-{occasion[:3].upper()}-{id(self)}",
            "image_url": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
            "confidence_score": 0.65,
        }

    def generate_budget_recommendation(
        self,
        occasion: str,
        gender: str,
        budget: str,
        style: Optional[str] = None,
    ) -> Dict[str, Any]:
        """
        Generate outfit recommendation with budget consideration.

        Args:
            occasion: The occasion for the outfit
            gender: User's gender
            budget: User's budget range
            style: Preferred style (optional)

        Returns:
            Dictionary containing budget-conscious outfit recommendation
        """
        recommendation = self.generate_recommendation(occasion, gender, style)

        # Add budget information
        budget_ranges = {
            "$25-$50": {"top": "$25-$40", "bottom": "$30-$50", "shoes": "$40-$50"},
            "$50-$100": {"top": "$30-$50", "bottom": "$50-$70", "shoes": "$50-$100"},
            "$100-$200": {"top": "$50-$100", "bottom": "$70-$120", "shoes": "$100-$200"},
            "$200+": {"top": "$100+", "bottom": "$120+", "shoes": "$200+"},
        }

        budget_info = budget_ranges.get(budget, budget_ranges["$50-$100"])
        recommendation["budget_breakdown"] = budget_info
        recommendation["total_budget"] = budget

        return recommendation

    def generate seasonal_recommendation(
        self,
        occasion: str,
        gender: str,
        season: str,
        style: Optional[str] = None,
    ) -> Dict[str, Any]:
        """
        Generate outfit recommendation considering the season.

        Args:
            occasion: The occasion for the outfit
            gender: User's gender
            season: Current season (Summer, Winter, Spring, Fall)
            style: Preferred style (optional)

        Returns:
            Dictionary containing season-appropriate outfit recommendation
        """
        # Adjust recommendations based on season
        season_additions = {
            "Summer": {"accessory": "Sunglasses", "top_layer": None},
            "Winter": {"accessory": "Scarf, Gloves", "top_layer": "Coat"},
            "Spring": {"accessory": "Hat", "top_layer": "Light Jacket"},
            "Fall": {"accessory": "Scarf", "top_layer": "Bomber Jacket"},
        }

        recommendation = self.generate_recommendation(occasion, gender, style)
        additions = season_additions.get(season, {})
        recommendation["seasonal_additions"] = additions
        recommendation["season"] = season

        return recommendation

    def generate_full_outfit(
        self,
        occasion: str,
        gender: str,
        season: Optional[str] = None,
        style: Optional[str] = None,
        color: Optional[str] = None,
        budget: Optional[str] = None,
    ) -> Dict[str, Any]:
        """
        Generate a complete outfit recommendation based on all parameters.

        Args:
            occasion: The occasion for the outfit
            gender: User's gender
            season: Current season (optional)
            style: Preferred style (optional)
            color: Preferred colors (optional)
            budget: Budget range (optional)

        Returns:
            Complete outfit recommendation dictionary
        """
        recommendation = self.generate_recommendation(occasion, gender, style)

        if color:
            recommendation["color_scheme"] = color
            recommendation["color_description"] = f"Recommended in {color}"

        if season:
            recommendation = self.generate_seasonal_recommendation(
                occasion, gender, season, style
            )

        if budget:
            recommendation = self.generate_budget_recommendation(
                occasion, gender, budget, style
            )

        recommendation["items_list"] = [
            item
            for item in [
                recommendation.get("top"),
                recommendation.get("bottom"),
                recommendation.get("shoes"),
                recommendation.get("accessory"),
            ]
            if item
        ]

        return recommendation